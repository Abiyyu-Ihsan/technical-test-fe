import Head from 'next/head'
import MainOverview from './MainOverview'

export default function OverScreen() {
  return (
    <div className="flex">
      <Head>
        <title>Overview</title>
      </Head>
      <MainOverview/>
    </div>
  )
}
