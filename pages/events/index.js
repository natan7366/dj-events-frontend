import Link from 'next/link'
import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import {API_URL} from '@/config/index'

export default function EventsPage({events}) {
  console.log(events) // logged in the frontend
  return (
      <Layout> {/* here it wont show the showcase because of {router.pathname ==='/' && <Showcase />}*/}
        <h1>Events</h1>
        
        {!events.length && <h3>No events to show..</h3>}

        {events.map(evt =>(
          <EventItem key={evt.id} evt={evt} />
        ))}

        <Link href="/about">About</Link>
      </Layout>
  )
}

//export async function getServerSideProps() {
export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC`);
  const events = await res.json()
  console.log(events) // logged in the backend

  return {
    props: {events},
    revalidate: 1
  }
}
