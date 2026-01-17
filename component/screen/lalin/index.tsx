import Head from 'next/head'
import LalinMain from './LalinMain'

export default function LalinScreen() {
  return (
    <div className="flex">
      <Head>
        <title>Laporan Harian Per Hari</title>
      </Head>
      <LalinMain />
    </div>
  )
}
