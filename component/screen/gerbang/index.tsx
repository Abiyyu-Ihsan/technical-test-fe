import Head from 'next/head'
import GerbangMain from './MainGerbang'

export default function GerbangScreen() {
  return (
    <div className="flex">
      <Head>
        <title>Lis Gerbang</title>
      </Head>
      <GerbangMain />
    </div>
  )
}
