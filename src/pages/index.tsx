/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head'
import { useTask } from '@/service/apiClient'
import { useEffect } from 'react'

export default function Home() {
  const [{ response, data }, requestTask] = useTask();

  useEffect(() => {
    setTimeout(() => {
      requestTask().then(() => {
        console.log({ response, data })
      })
    }, 1000)
  }, [])

  return (
    <>
      <Head>
        <title>Time Tracking Web App</title>
        <meta name="description" content="A time tracking app to optimize developer performance!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <h1>
        Time Tracking Web App
      </h1>
    </>
  )
}
