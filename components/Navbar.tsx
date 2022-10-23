import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BiSearch } from 'react-icons/bi'
import { RiVideoAddFill } from 'react-icons/ri'
import {  googleLogout  } from '@react-oauth/google'
import { createOrGetUser } from '../utils'
import useAuthStore from '../store/authStore'
import axios from 'axios'
import { BASE_URL } from '../utils'
import Dropdown from './Dropdown'

const Navbar = () => {
  const {userProfile, addUser, removeUser} : any = useAuthStore()
  const [searchValue, setSearchValue] = useState('');
  const [image, setImage] = useState<any>()

  const router = useRouter();
  const transition = 'transition ease-in-out delay-200 hover:-translate-y-1 hover:scale-110'
  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    
    if(searchValue) {
      router.push(`/search/${searchValue}`);
      setSearchValue('')
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      if(userProfile)
      {
        const { data } = await axios.get(`${BASE_URL}/api/user/${userProfile._id}`)
        setImage(data.image)
      }
    }
    fetchUser()
  }, [userProfile])
  
  const logout = () => {
    googleLogout()
    removeUser()
    router.push('/')
  }

  return (
    <div className='w-full flex justify-between items-center bg- py-2 px-4'>
      <Link href="/">
        <div>
          <div className='w-[100px] md:w-[130px] hidden md:block cursor-pointer flex'>
            <h1 className='font-extrabold text-transparent text-2xl bg-clip-text bg-[rgb(232,232,232)] hover:bg-[#d4d4d8]'><b>QuickVids</b></h1>
          </div>
          <div className='md:hidden'>
            <h3 className='text-transparent text-lg bg-clip-text bg-[rgb(232,232,232)]'><b>QuickVids</b></h3>
          </div>
        </div>
      </Link>

      {/* search bar on large devices*/}
      <div className='relative hidden md:block'>
        <form
          onSubmit={handleSearch}
        >
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className='bg-primary p-3 md:text-md font-medium border-2 focus:border-gray-300 w-[300px] md:w-[350px] md:top-0 rounded-md'
            placeholder='Search'
          />
          <button
            onClick={handleSearch}
            className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400'
          >
            <BiSearch className={`${transition}`}/>
          </button>
        </form>
      </div>

      {/* search bar on mobile device */}
      <div className='md:hidden flex relative ml-4'>
        <form
          onSubmit={handleSearch}
        >
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className='w-[161px] h-[30px] mr-2 rounded pl-2'
            placeholder='Search'
          />
            <button
              onClick={handleSearch}
              className='absolute inset-y-1 right-4'
            >
              <BiSearch className='font-bold'/>
            </button>

        </form>
      </div>
      <div>
        {userProfile ? (
        <div className='flex gap-3 md:gap-10 mt-1'>
          <div >
            <Link href='/upload'>
              <button className={`ml-[5px] text-white bg-blue-400 p-2 rounded-xl hidden md:block ${transition} border-2 border-white`}>
                  <b>UPLOAD</b>
              </button>
            </Link>
          </div>
          <div>
            <Link href='/upload'>
              <button className={`ml-[5px] text-white bg-blue-400 p-2 rounded-xl md:hidden ${transition}`}>
                  <RiVideoAddFill/>
              </button>
            </Link>
          </div>
          {/* render profile image */}
          <Dropdown addUser={addUser} createOrGetUser={createOrGetUser} userProfile={userProfile} image={image} logout={logout} router={router}/>
        </div>
        ) : (
          <div>
            <Dropdown addUser={addUser} createOrGetUser={createOrGetUser} userProfile={userProfile} image={image} logout={logout} router={router}/>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar