import React, { useState } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';

import Discover from './Discover';
import SuggestedAccounts from './SuggestedAccounts';
import Footer from './Footer';

const Sidebar: NextPage = () => {

  const [showSidebar, setShowSidebar] = useState(true)
  const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded text-[#db2777]'

  return (
    <div>
      <div 
        className='block m-1 ml-6 mt-3 text-xl cursor-pointer'
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        {showSidebar ? <ImCancelCircle/> : <AiOutlineMenu/>}
      </div>
      {showSidebar && (
        <div className='xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-white xl:border-0 p-3'> 
          <div className='xl:border-b-2 border-white xl:pb-4'>
            <Link href='/'>
              <div className={normalLink}>
                <p className='text-2xl mb-2 mr-2'>
                  <AiFillHome/>
                </p>
                <span className='capitalize text-xl hidden xl:block'>
                  Home
                </span>
              </div>
            </Link>
          </div>
          <Discover/>
          <SuggestedAccounts/>
          <Footer/>
        </div>
      )}
    </div>
  )
}

export default Sidebar