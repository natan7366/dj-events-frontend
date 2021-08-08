import qs from 'qs'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import {API_URL} from '@/config/index'

export default function SearchPage({events}) {
  console.log(events) // logged in the frontend
  const router = useRouter();
  console.log(router.query)

  return (
      <Layout title='Search Results'> {/* here it wont show the showcase because of {router.pathname ==='/' && <Showcase />}*/}
        <Link href='/events'>Go Back</Link> 
        <h1>Search Results for {router.query.term}</h1>
        
        {!events.length && <h3>No events to show..</h3>}

        {events.map(evt =>(
          <EventItem key={evt.id} evt={evt} />
        ))}

        <Link href="/about">About</Link>
      </Layout>
  )
}

//export async function getServerSideProps() {
export async function getServerSideProps( {query: {term} } ) {
  // for a simple case: just search by one thing:
  //const res = await fetch(`${API_URL}/events?name_contains=${term}`);
  const query = qs.stringify({
    _where:{
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term }
    ]}
  });

  const res = await fetch(`${API_URL}/events?${query}`);
  const events = await res.json()
  console.log(events) // logged in the backend

  return {
    props: {events},
  }
}
