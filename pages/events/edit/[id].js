//import axios from 'axios';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react' 
import {useRouter}  from 'next/router'
import Link from 'next/link'
import Layout from '@/components/Layout'
import {API_URL} from '@/config/index'
import styles from '@/styles/Form.module.css'

export default function EditEventPage({evt}) {
  
  const router = useRouter();

  const [values, setValues] = useState({
    name: evt.name,
    performers: evt.performers,
    venue: evt.venue,
    address: evt.address,
    date: evt.date,
    time: evt.time,
    description: evt.description
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    const hasEmptyFields = Object.values(values).some(element => element==='');
    if (hasEmptyFields) {
      toast.error('Please fill in all the fields !')
    } else {  
      const res = await fetch(`${API_URL}/events/${evt.id}`, {
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })

      if(!res.ok) {
        toast.error('Something Went Wrong... ')
      } else {
        const evt = await res.json();
        router.push(`/events/${evt.slug}`);
        // from some reason, the router.push didnt work with axios..
      }
    }
  } 

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setValues({...values, [name]: value})
  }

  return (
    <Layout title='add new event'>
      <Link href='/events'>Go Back</Link>
      <h1>Edit Event</h1> 
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor='name'>Event Name</label>
            <input 
              type = "text"
              id='name'
              name='name'
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='name'>Performers</label>
            <input 
              type = "text"
              id='performers'
              name='performers'
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='name'>Venue</label>
            <input 
              type = "text"
              id='venue'
              name='venue'
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='name'>Address</label>
            <input 
              type = "text"
              id='address'
              name='address'
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='name'>Date</label>
            <input 
              type = "date"
              id='date'
              name='date'
              value={moment(values.date).format('yyyy-MM-DD')}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='name'>Time</label>
            <input 
              type = "text"
              id='time'
              name='time'
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor='name'>Description</label>
          <textarea
            type = "text"
            id='description'
            name='description'
            value={values.description}
            onChange={handleInputChange}
          >
          </textarea>
        </div>

        <input type='submit' value='Update Event' className='btn'/>
      </form>
    </Layout>
  )
}

export async function getServerSideProps ({params: {id}}) {
  const res = await fetch(`${API_URL}/events/${id}`)
  const evt = await res.json();

  return {
    props: {evt}
  }
}