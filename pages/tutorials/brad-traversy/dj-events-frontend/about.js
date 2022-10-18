import React from 'react'
import Link from 'next/link'
import Layout from '../../../../components/brad-traversy/dj-events-frontend/Layout'

export default function AboutPage() {
  return (
    <Layout title={"About DJ Events"}>
      <div>About</div>
      <p>This is an App to find the laest DJ events and other musical events</p>
      <p>Version: 1.0.0</p>
      <Link href="/">Home</Link>
    </Layout>
  )
}
