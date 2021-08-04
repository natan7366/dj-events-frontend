import Link from 'next/link'
import Layout from '@/components/Layout'
import {API_URL} from '@/config/index'

export default function Home({events}) {
  console.log(events)
  return (
      <Layout>
        <h1>Upcoming Events</h1>
        <Link href="/about">About</Link>
      </Layout>
  )
}

//export async function getServerSideProps() {
export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json()
  console.log(events)

  return {
    props: {events},
    revalidate: 1
  }
}
