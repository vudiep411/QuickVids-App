import React, { useEffect } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import Avatar from '@mui/material/Avatar';

import { IUser } from '../type';
import useAuthStore from '../store/authStore';


const SuggestedAccounts: NextPage = () => {
  const { fetchAllUsers, allUsers } = useAuthStore()
  
  useEffect(() => {
    fetchAllUsers();

  }, [fetchAllUsers])


  return (
    <div className='xl:border-b-2 border-gray-400 pb-4'>
      <p className='text-gray-300 font-semibold m-3 mt-4 hidden xl:block'>
        Suggested Accounts
      </p>
      <div>
        {allUsers?.slice(0, 6).map((user: IUser) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className='flex gap-3 hover:bg-[rgb(80,80,80)] p-2 cursor-pointer font-semibold rounded'>
              <div className='w-8 h-8'>
                  <Avatar
                    sx={{width: 34, height: 34}}
                    src={user.image}
                  />
              </div>

              <div className='hidden xl:block'>
                <p className='flex gap-1 items-center text-md font-bold text-[rgb(232,232,232)] lowercase'>
                  {user.userName.replace(/\s+/g, '')}{' '}
                  <GoVerified className='text-blue-400' />
                </p>
                <p className='capitalize text-gray-400 text-xs'>
                  {user.userName}
                </p>
              </div>
            </div>            
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SuggestedAccounts