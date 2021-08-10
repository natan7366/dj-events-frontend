import Pagination from '@/components/Pagination'
import Link from 'next/link'
import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import {API_URL, PER_PAGE} from '@/config/index'

export default function EventsPage( {events, page , total} ) {
  //console.log(events) // logged in the frontend

  return (
      <Layout> {/* here it wont show the showcase because of {router.pathname ==='/' && <Showcase />}*/}
        <h1>Events</h1>
        
        {!events.length && <h3>No events to show..</h3>}

        {events.map(evt =>(
          <EventItem key={evt.id} evt={evt} />
        ))}

        <Link href="/about">About</Link>

        <Pagination total={total} page={page} />

      </Layout>
  )
}

//export async function getServerSideProps() {
export async function getServerSideProps({query: {page=1}}) {
  console.log(page)
  // calculate start page --> +page convert it from str to number
  // the start is the index of the events array
  const start = +page === 1 ? 0 : (+page-1) * PER_PAGE

  // 1) fetch count
  const totalRes = await fetch(`${API_URL}/events/count`);
  const total = await totalRes.json()

  // 2) fetch events
  const eventsRes = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`);
  const events = await eventsRes.json()
  //console.log(events) // logged in the backend

  return {
    props: {events, page: +page, total}
  }
}
