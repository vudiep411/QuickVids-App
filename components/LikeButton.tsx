import React, {useState, useEffect} from 'react'
import { NextPage } from 'next';
import {AiTwotoneFire} from 'react-icons/ai'
import useAuthStore from '../store/authStore'
import { BASE_URL } from '../utils'
import axios from 'axios'


interface IProps {
  likes: any;
  setPost: any;
  post : any;
  playLike: any
}

const LikeButton: NextPage<IProps> = ({ likes, setPost, post, playLike}) => {
  const { userProfile } : any = useAuthStore()
  
  const [likesArray, setLikeArray] = useState(likes?.map((item: any) => item._ref))
  const [liked, setLiked] = useState(likesArray?.includes(userProfile?._id))
  const likeSet = new Set(likesArray)

  const handleLike = async (like: boolean) => {
    if(userProfile) {
      if(likesArray?.includes(userProfile?._id)) {
        setLikeArray((prev : any) => prev.filter((item : any) => item !== userProfile?._id))
        setLiked(false)
      } else {
        setLikeArray((prev : any) => [...prev, userProfile?._id])
        setLiked(true)
      }
      playLike()
      await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like
      })

    }
  }

  return (
    <div className='flex gap-6'>
      <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
        {liked ? (
          <div className='bg-primary rounded-full p-2 md:p-4 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600' onClick={() => handleLike(false)}>
            <AiTwotoneFire className='text-lg md:text-2xl text-[#e11d48]'/>
          </div>
        ) : (
          <div className='bg-primary rounded-full p-2 md:p-4 ' onClick={() => handleLike(true)}>
            <AiTwotoneFire className='text-lg md:text-2xl' />
          </div>
        )}
        <p className='text-md font-semibold text-[rgb(232,232,232)]'>{likeSet.size || 0}</p>
      </div>
    </div>
  )
}

export default LikeButton