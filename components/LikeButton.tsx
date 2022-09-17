import React, {useState, useEffect} from 'react'
import { MdFavorite } from 'react-icons/md'
import { NextPage } from 'next';
import {AiTwotoneFire} from 'react-icons/ai'
import useAuthStore from '../store/authStore'


interface IProps {
  likes: any;
  handleLike: () => void;
  handleDislike: () => void;
}

const LikeButton: NextPage<IProps> = ({handleLike, handleDislike, likes}) => {
  const [liked, setLiked] = useState(false)
  const { userProfile } : any = useAuthStore()
  const filterLikes = likes?.filter((item : any) => item._ref === userProfile?._id)

  useEffect(() => {
    if(filterLikes?.length > 0)
      setLiked(true)
    else
      setLiked(false)

  }, [likes, filterLikes])

  return (
    <div className='flex gap-6'>
      <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
        {liked ? (
          <div className='bg-primary rounded-full p-2 md:p-4 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600' onClick={handleDislike}>
            <AiTwotoneFire className='text-lg md:text-2xl text-[#e11d48]'/>
          </div>
        ) : (
          <div className='bg-primary rounded-full p-2 md:p-4 ' onClick={handleLike}>
            <AiTwotoneFire className='text-lg md:text-2xl' />
          </div>
        )}
        <p className='text-md font-semibold text-[rgb(232,232,232)]'>{likes?.length || 0}</p>
      </div>
    </div>
  )
}

export default LikeButton