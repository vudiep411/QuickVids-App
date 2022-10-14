import React from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import { BASE_URL } from '../../utils';
import Link from 'next/link';
import { Avatar } from '@mui/material';
import { IUser } from '../../type';
import { GoVerified } from 'react-icons/go';
import { Container } from '@mui/system';

const Followers = ({ data } : any) => {
  const transition = 'transition ease-in-out delay-400 hover:-translate-y-1 hover:scale-108 over:-translate-x-2'
  const router = useRouter()
  const { id } = router.query

  return (
    <div className='p-3'>
      <div className='mb-3 flex gap-5'>
        <Link href={`/profile/${id}`}>
          <div>
            <Avatar
                  sx={{display: { xs: 'none', md: 'block' }, 
                  height: 100, 
                  width: 100,
                  cursor: 'pointer'
                }}
                  src={data.image}
            />
            <Avatar
              sx={{display: { xs: 'block', md: 'none' }, 
              height: 75, 
              width: 75,
              marginTop: '9px',
              cursor: 'pointer'
            }}
              src={data.image}
            />
          </div>
        </Link>
        <Link href={`/profile/${id}`}>
          <p className='text-md text-2xl font-bold tracking-wider flex gap-2 items-center justify-center lowercase text-[rgb(232,232,232)] cursor-pointer'>
            {data.userName}
          </p>
        </Link>
      </div>
      <Container maxWidth='md'>        
        <p className='text-lg text-[rgb(232,232,232)] font-bold mb-3'>All followers</p>
        {data?.data.map((user : IUser) => 
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
      </Container>
    </div>
  )
}

export const getServerSideProps = async ({
  params: { id },
} : {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/followers/${id}`);
  return {
    props: { data: res.data },
  };
};


export default Followers