import React from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import { BASE_URL } from '../../utils';
import Link from 'next/link';
import { Avatar } from '@mui/material';
import { IUser, Video } from '../../type';
import { GoVerified } from 'react-icons/go';

const Followers = ({ data } : any) => {
  console.log(data)
  const router = useRouter()
  const { id } : any = router.query
  const transition = 'transition ease-in-out delay-400 hover:-translate-y-1 hover:scale-108 over:-translate-x-2'
  return (
    <div className='p-3'>
      <p className='text-lg text-[rgb(232,232,232)] font-bold mb-3'>All followers</p>
      {data.map((user : IUser) => 
        <Link key={user._id} href={`/profile/${user._id}`}>
          <div className={`flex gap-3 p-2 cursor-pointer font-semibold rounded hover:${transition}`}>
            <div>
              <Avatar
                sx={{width: 50, height: 50}}
                src={user.image}
              />
            </div>
            <div>
               <div>
                 <p className='flex gap-1 items-center text-lg text-[rgb(232,232,232)] font-bold hover:text-gray-400'>
                   {user.userName} <GoVerified className='text-blue-400' />
                 </p>
                 <p className='capitalize text-gray-400 text-sm'>
                  {user.name}
                </p>
              </div>
            </div>
          </div>
         </Link>
      )}
    </div>
  )
}

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/followers/${id}`);
  return {
    props: { data: res.data },
  };
};


export default Followers