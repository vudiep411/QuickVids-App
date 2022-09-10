import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiOutlineLogout, AiFillVideoCamera } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { RiVideoAddFill } from 'react-icons/ri'
import { GoogleLogin, googleLogout  } from '@react-oauth/google'
import { createOrGetUser } from '../utils'
import useAuthStore from '../store/authStore'
import axios from 'axios'
import { BASE_URL } from '../utils'

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
  

  return (
    <div className='w-full flex justify-between items-center border-b-2 py-2 px-4 bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r'>
      <Link href="/">
        <div>
          <div className='w-[100px] md:w-[130px] hidden md:block cursor-pointer flex'>
            <h1 className='font-extrabold text-transparent text-2xl bg-clip-text bg-white hover:bg-[#d4d4d8]'><b>QuickVids</b></h1>
          </div>
          <div className='md:hidden font-bold text-2xl text-pink-600'>
            <AiFillVideoCamera/>
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
            className='w-[150px] h-[30px] mr-2 rounded pl-2'
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
        <div className='flex gap-5 md:gap-10 mt-1'>
          <Link href='/upload'>
            <button className='px-2'>
              <RiVideoAddFill className={`text-3xl text-pink-600 ${transition}`}/>
            </button>
          </Link>
          {/* render profile image */}
          {userProfile.image && (
            <Link href={`/profile/${userProfile._id}`}>        
            <div className={`${transition}`}>
              <Image
                width={40}
                height={40}
                className='rounded-full cursor-pointer'
                src={image}
                alt='profile photo'
              />
            </div>      
            </Link>
          )}

          {/* logout */}
          <button
            type='button'
            className={`px-2 ${transition}`}
            onClick={() => {
              googleLogout()
              removeUser()
              router.push('/')
            }}
          >
            <AiOutlineLogout color='red' fontSize={22}/>
          </button>
        </div>
        ) : (
          <div className=''>
            <GoogleLogin
              useOneTap
              onSuccess={(response) => createOrGetUser(response, addUser)}
              onError={() => {console.log('Error')}}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar