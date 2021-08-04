import React from 'react'
import Layout from '../../components/Layout'

import { useRouter } from 'next/dist/client/router'

export default function EventPage() {

  const router = useRouter();
  console.log(router.route);

  return (
    <Layout>
      <h1>My Event test 3</h1>
      <p>{router.pathname}</p>
      <p>{router.query.slug}</p>
      <button onClick={()=>router.push('/')}>click</button>

    </Layout>
  )
}
