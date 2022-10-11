import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { GoVerified } from 'react-icons/go';
import Link from 'next/link';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';

import NoResults from '../../components/NoResults';
import VideoCard from '../../components/VideoCard';
import useAuthStore from '../../store/authStore';
import { BASE_URL } from '../../utils';
import { IUser, Video } from '../../type';

const Search = ({ videos } : {videos: Video[]}) => {
    const [isAccounts, setIsAccounts] = useState(false);
    const { allUsers } : { allUsers: IUser[] } = useAuthStore();
    const [posts, setPosts] = useState(videos)

    const router = useRouter();
    const { keyword }: any = router.query;
    const accounts = isAccounts ? 'border-b-2 border-white text-white' : 'text-gray-400';
    const isVideos = !isAccounts ? 'border-b-2 border-white text-white' : 'text-gray-400';
    const searchedAccounts = allUsers?.filter((user: IUser) =>  user.userName.toLowerCase().replace(/\s/g, '').includes(keyword.toLowerCase()));
  return (
    <div className='w-full'>
      <div className='flex gap-10 mb-10 w-full'>
        <p onClick={() => setIsAccounts(true)} className={`text-xl  font-semibold cursor-pointer ${accounts} mt-2`}>
          Accounts
        </p>
        <p className={`text-xl font-semibold cursor-pointer ${isVideos} mt-2`} onClick={() => setIsAccounts(false)}>
          Videos
        </p>
      </div>
      {isAccounts ? (
        <div className='md:mt-10'>
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user: IUser, idx: number) => (
              <Link key={idx} href={`/profile/${user._id}`}>
                <div className=' flex gap-3 p-2 cursor-pointer font-semibold rounded'>
                  <div>
                    <Avatar
                      sx={{width: 50, height: 50}}
                      src={user.image}
                    />
                  </div>
                  <div>
                    <div>
                      <p className='flex gap-1 items-center text-lg text-[rgb(232,232,232)] font-bold'>
                        {user.userName} <GoVerified className='text-blue-400' />
                      </p>
                      <p className='capitalize text-gray-400 text-sm'>
                        {user.name}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResults text={`No Account Results for ${keyword}`} />
          )}
        </div>
      ) : (
        <div className='md:mt-16 flex flex-wrap gap-6 md:justify-start '>
          {posts?.length ? (
            posts.map((post: Video, idx: number) => (
              <VideoCard post={post} key={idx} setPosts={setPosts}/>
            ))
          ) : (
            <NoResults text={`No Video Results for ${keyword}`} />
          )}
        </div>
      )}
    </div>
  )
}

export const getServerSideProps = async ({
    params: { keyword },
  }: {
    params: { keyword: string };
  }) => {
    const res = await axios.get(`${BASE_URL}/api/search/${keyword}`);
    return {
      props: { videos: res.data },
    };
  };

export default Search