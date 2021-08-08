import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/components/Layout'
import {API_URL} from '@/config/index'
import styles from '@/styles/Event.module.css'

export default function EventPage({evt}) {

  const deleteEvent = (e) => {
    console.log('delete')
  }

  return (
    <Layout>
      <div className={styles.event}>
        
        <div className={styles.controls}>
          <Link href={`events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt />Edit Event
            </a>
          </Link>
          {/* now we will put an <a> just for the method of delete event
           - not a link so we put # - points to nothing */}
          <a href='#' 
            className={styles.delete}
            onClick={deleteEvent}
          >
            <FaTimes />Delete Event
          </a> 
        </div>

        <span>
          {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        {evt.image && (
          <div className={styles.image}>
            <Image src={evt.image.formats.medium.url}
              width={960} height={600} alt=''/>
          </div>
        )}

        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        <Link href='/events'>
          <a className={styles.back}>
            {'<'} Go Back
          </a>
        </Link>
      </div>
    </Layout>
  )
}

// with dynamic routes, we have 2 options to fetch the data:
// 1) combine both getStaticPaths & getStaticProps func - it wont work with just one of them!
export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/events`);
  const events = await res.json()

  const paths = events.map(evt => ({
    params: {slug: evt.slug}
  }))
  // it returns 2 things: 1) array of paths 2) fallback - false means that a 404 page
  // will be displayed if the path doesn't exist, abd true means that the app wont crash if the path doesn't exist
  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps( {params: {slug} }) {
  console.log(slug) 
  const res = await fetch(`${API_URL}/events?slug=${slug}`);
  const events = await res.json()
  //console.log(events) // logged in the backend

  return {
    props: {
      evt: events[0]
    },
    revalidate: 1
  }
}

// 2) work just with getServerSideProps( {query: {slug} } as we already saw

// export async function getServerSideProps( {query: {slug} }) {
//   console.log(slug) 
//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const events = await res.json()
//   console.log(events) // logged in the backend

//   return {
//     props: {
//       evt: events[0]
//     }
//   }
// }


  
