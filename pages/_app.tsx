import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { GoogleOAuthProvider } from '@react-oauth/google'


const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true)

  useEffect(() => {
    setIsSSR(false)
  }, [])

  if(isSSR) return null

  return (
      <GoogleOAuthProvider clientId={`${process.env.GOOGLE_TOKEN}`}>
        <div className='xl:w-[1200px] m-auto overflow-hidden h-[100vh] bg-[rgb(24,24,24)]'>
        <Navbar/>
          <div className='flex gap-5 md:gap-20'>
            <div className='h-[92vh] overflow-hidden xl:hover:overflow-scroll'>
              <Sidebar/>
            </div>
            <div className='flex flex-col gap-10 overflow-auto h-[92vh] videos flex-1 mb-20 '>
              <Component {...pageProps}/>
            </div>
          </div>
        </div>
      </GoogleOAuthProvider>
  )
}

export default MyApp
