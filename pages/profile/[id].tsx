import React, { useEffect, useState } from 'react';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';

import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';
import { IUser, Video } from '../../type';
import { BASE_URL } from '../../utils';
import useAuthStore from '../../store/authStore'
import { useRouter } from 'next/router';
import Modal from '../../components/Modal'

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}
 
const Profile = ({ data }: IProps) => {
  const [showUserVideos, setShowUserVideos] = useState<Boolean>(true);
  const [videosList, setPosts] = useState<Video[]>([]);  
  const { user, userVideos, userLikedVideos } = data;

  const [noOfFollowers, setNoOfFollowers] = useState(user.followers)
  const [name, setName] = useState(user.name)
  const [username, setUsername] = useState(user.userName)
  const [image, setImage] = useState(user.image)

  const videos = showUserVideos ? 'border-b-2 border-white text-white' : 'text-gray-500';
  const liked = !showUserVideos ? 'border-b-2 border-white text-white':  'text-gray-500';
  const router = useRouter()
  const { userProfile } : {userProfile: any}= useAuthStore()
  const { id } : any = router.query
  
  useEffect(() => {
    const fetchVideos = async () => {
      if (showUserVideos) {
        setPosts(userVideos);
      } else {
        setPosts(userLikedVideos);
      }
      setNoOfFollowers(user.followers)
      setUsername(user.userName)
      setName(user.name)
      setImage(user.image)
    };
    fetchVideos();
  }, [showUserVideos, userLikedVideos, userVideos, user, id]);
  
  // handle when click follow
  const handleFollow = async () => {
    const check = noOfFollowers?.find((item: any) => item._ref === userProfile._id)
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

  // render follow button
  const FollowButton = () => {
    return !noOfFollowers?.find((item: any) => item._ref === userProfile._id) ?
    (
      <button
        onClick={handleFollow} 
        className="mt-2 w-[100px] bg-blue-500 text-[rgb(232,232,232)] font-bold text-xs px-4 py-2 rounded shadow-lg hover:shadow-md outline-none focus:outline-none mr-1 mb-1" type="button">
        Follow
      </button>
    ) : ( 
      <button
        onClick={handleFollow} 
        className="mt-2 w-[100px] bg-[rgb(64,64,64)] hover:bg-[rgb(72,72,72)] text-[rgb(232,232,232)] font-bold text-xs border-1 border-black px-4 py-2 rounded shadow-lg hover:shadow-md mr-1 mb-1" type="button">
        Unfollow
      </button>      
    )
  }

  return (
    <div className='w-full'>
      <div className='flex gap-6 md:gap-5 mb-4 w-full'>
        <div className='w-16 h-16 md:w-32 md:h-32'>
          <Avatar
            sx={{display: { xs: 'none', md: 'block' }, 
            height: 100, 
            width: 100
          }}
            src={image}
          />
          <Avatar
            sx={{display: { xs: 'block', md: 'none' }, 
            height: 75, 
            width: 75,
            marginTop: '9px'
          }}
            src={image}
          />
        </div>
        <div>
          <div className='text-md text-2xl font-bold tracking-wider flex gap-2 items-center justify-center lowercase text-[rgb(232,232,232)]'>
            <span>{username.replace(/\s+/g, '')} </span>
            <GoVerified className='text-blue-400 md:text-xl text-md mt-2' />
          </div>
          <p className='text-sm font-medium text-[rgb(232,232,232)]'> {name}</p>
          <p className='mt-3 text-[rgb(232,232,232)] cursor-pointer hover:text-gray-500'
              onClick={() => router.push(`/followers/${id}`)}
          ><b>
            {noOfFollowers?.length || 0}
            </b> Followers</p>
          { (userProfile?._id !== id && userProfile) &&
            <FollowButton/>
          }
        </div>
        {userProfile?._id === id &&
          <div>
        <Modal name={name} username={username} setName={setName} setUsername={setUsername} image={image} setImage={setImage} id={id}/>
          </div>
        }
      </div>
      <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-400 w-full'>
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
              <VideoCard key={idx} post={post} setPosts={setPosts}/>
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