/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head'
import HomeScreen from '@/screens/Home/Home'

export default function Home() {

  return (
    <>
      <Head>
        <title>Time Tracking Web App</title>
        <meta name="description" content="A time tracking app to optimize developer performance!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <HomeScreen />
    </>
  )
}
