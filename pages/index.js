import Head from 'next/head'
import Content from '../components/Content'
import Player from '../components/Player'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Spotify clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex">
        <Sidebar />
        <Content />
      </main>
      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  )
}
