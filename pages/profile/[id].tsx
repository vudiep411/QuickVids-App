import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';

import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';
import { IUser, Video } from '../../type';
import { BASE_URL } from '../../utils';
import useAuthStore from '../../store/authStore'
import { useRouter } from 'next/router';

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

const Profile = ({ data }: IProps) => {
  const [showUserVideos, setShowUserVideos] = useState<Boolean>(true);
  const [videosList, setVideosList] = useState<Video[]>([]);  
  const { user, userVideos, userLikedVideos } = data;
  const [noOfFollowers, setNoOfFollowers] = useState(user.followers)

  const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';
  const liked = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';
  const router = useRouter()
  const { userProfile } : {userProfile: any}= useAuthStore()
  const { id } : any = router.query
  
  
  useEffect(() => {
    const fetchVideos = async () => {
      if (showUserVideos) {
        setVideosList(userVideos);
      } else {
        setVideosList(userLikedVideos);
      }
    };
    fetchVideos();
  }, [showUserVideos, userLikedVideos, userVideos]);
  
  
  const handleFollow = async () => {
    const check = noOfFollowers.find((item: any) => item._ref === userProfile._id)
    let follow = true
    if(check)
        follow = false

    if(userProfile)
    {
      const { data } = await axios.put(`${BASE_URL}/api/followers`, {
          userId: userProfile._id,
          followingID: id,          
          follow: follow
      })
      setNoOfFollowers(data.followers)
    }
  }

  const FollowButton = () => {
    return !noOfFollowers.find((item: any) => item._ref === userProfile._id) ?
    (
    <button
      onClick={handleFollow} 
      className="mt-2 w-[100px] bg-blue-500 text-white font-bold text-xs px-4 py-2 rounded shadow-lg hover:shadow-md outline-none focus:outline-none mr-1 mb-1" type="button">
      Follow
    </button>
    ) : (
      <button
      onClick={handleFollow} 
      className="mt-2 w-[100px] bg-[#cffafe] text-black font-bold text-xs border-1 border-black px-4 py-2 rounded shadow-lg hover:shadow-md mr-1 mb-1" type="button">
      Unfollow
    </button>      
    )
  }

  return (
    <div className='w-full'>
      <div className='flex gap-6 md:gap-10 mb-4 w-full'>
        <div className='w-16 h-16 md:w-32 md:h-32'>
          <Image
              width={120}
              height={120}
              layout='responsive'
              className='rounded-full'
              src={user.image}
              alt='user-profile'
            />
        </div>
        <div>
          <div className='text-md text-2xl font-bold tracking-wider flex gap-2 items-center justify-center lowercase'>
            <span>{user.userName.replace(/\s+/g, '')} </span>
            <GoVerified className='text-blue-400 md:text-xl text-md mt-2' />
          </div>
          <p className='text-sm font-medium'> {user.userName}</p>
          <p className='mt-3'><b>{noOfFollowers.length || 0}</b> Followers</p>
          { (userProfile?._id !== id && userProfile) &&
            <FollowButton/>
          }
        </div>
      </div>
      <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 w-full'>
          <p className={`text-xl font-semibold cursor-pointer ${videos} mt-2`} onClick={() => setShowUserVideos(true)}>
            Videos
          </p>
          <p className={`text-xl font-semibold cursor-pointer ${liked} mt-2`} onClick={() => setShowUserVideos(false)}>
            Liked
          </p>
      </div>  
      <div className='flex gap-6 flex-wrap md:justify-start'>
          {videosList?.length > 0 ? (
            videosList?.map((post: Video, idx: number) => (
              <VideoCard key={idx} post={post} />
            ))
          ) : (
            <NoResults
              text={`No ${showUserVideos ? '' : 'Liked'} Videos Yet`}
            />
          )}
        </div>  
    </div>
  )
}

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);
  return {
    props: { data: res.data },
  };
};

export default Profile