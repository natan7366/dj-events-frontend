//import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react' 
import {useRouter}  from 'next/router'
import Link from 'next/link'
import Layout from '@/components/Layout'
import {API_URL} from '@/config/index'
import styles from '@/styles/Form.module.css'

export default function AddEventPage() {
  
  const router = useRouter();

  const [values, setValues] = useState({
    name: '',
    performers: '',
    venue: '',
    address: '',
    date: '',
    time: '',
    description: ''
  })

  // const addEvent = async () => {
  //   try {
  //     const res = await axios.post(`${API_URL}/events`, values);
  //     if (res.status===200) {
  //       console.log('res is : ', res);
  //       console.log('evt.slug is : ', evt.slug);
  //       router.push(`/events/${evt.slug}`);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error('Something went wrong...')
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    const hasEmptyFields = Object.values(values).some(element => element==='');
    if (hasEmptyFields) {
      toast.error('Please fill in all the fields !')
    } else {  
      const res = await fetch(`${API_URL}/events`, {
        method: 'POST',
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
      <h1>Add Event</h1> 
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
              value={values.date}
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

        <input type='submit' value='Add Event' className='btn'/>
      </form>
    </Layout>
  )
}
