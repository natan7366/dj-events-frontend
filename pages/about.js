import React from 'react'
import Layout from '@/components/Layout'

import Link from 'next/link';
export default function AboutPage() {
  return (
    <Layout title="About dj events">
      <h1>About</h1>
      <p>This is an app to find the latest dj an d other musical events</p>
      <p>Version: 1.0.0</p>
      <Link href="/">Home</Link>
    </Layout>
  )
}
