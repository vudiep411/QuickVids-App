import React, { useRef, useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import avatar from '../styles/images/avatar.jpg'
import { HiDotsHorizontal } from 'react-icons/hi'
import moment from 'moment';

import axios from 'axios';
import { useRouter } from 'next/router';
import { Video } from '../type';
import useAuthStore from '../store/authStore'
import { BASE_URL } from '../utils';

interface IProps {
    post: Video
}
const VideoCard: NextPage<IProps> = ({ post }) => {

    const videoRef = useRef<HTMLVideoElement>(null)
    const { userProfile } :any = useAuthStore()
    const [showDropdown, setShowDropdown] = useState(false)
    const router = useRouter()

    const handleDropdown = () => {
        if(showDropdown)
            setShowDropdown(false)
        else
            setShowDropdown(true)
    }
const handleDelete = async () => {
    await axios.delete(`${BASE_URL}/api/post/delete`, {data: {id: post._id}})
    router.reload()
}
const Dropdown = () => {
return (
    <div className="absolute z-10 w-35 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
        <li>
            <p onClick={handleDelete} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">Delete</p>
        </li>
        {/* <li>
            <a className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Update</a>
        </li> */}
        </ul>
    </div>
)
}

  return (
    <div className='flex flex-col pb-6'>
        <div className='flex gap-3 p-2 font-semibold rounded'>
            <div className='md:w-16 md:h-16 w-10 h-10 cursor-pointer'>
                <Link href={`/profile/${post.postedBy._id}`}>
                    <div className='mt-2'>
                        <Image
                            width={60}
                            height={60}
                            className='rounded-full'
                            src={post.postedBy?.image || avatar}
                            alt='profile photo'
                            layout='responsive'
                        />
                    </div>
                </Link>
            </div>
            <div className='mt-2 '>
                <div className='flex gap-2'>
                    <Link href={`/profile/${post.postedBy._id}`}>
                        <div className='items-center gap-2'>
                            <p className='flex gap-2 items-center md:text-md font-bold text-primary cursor-pointer'>
                                {post.postedBy.userName}
                                <GoVerified className='text-blue-400 text-md'/>
                            </p>
                        </div>
                    </Link>
                    { (userProfile && userProfile._id === post.postedBy._id) &&
                    <div className='ml-6' onClick={handleDropdown}>
                        <HiDotsHorizontal className='text-xl cursor-pointer mt-1'/>
                        {showDropdown && <Dropdown/>}
                    </div>
                    }
                </div>
                <p className='text-slate-400 text-sm mb-2'>{moment(post.date).fromNow()}</p>
            </div>
        </div>
        <div className='lg:ml-20 md:ml-20 sm: ml-[60px] flex gap-4 relative'> 
            <div className='rounded-3xl'>
                <Link href={`/detail/${post._id}`}>
                    <div>
                        <div className='mb-5'>
                            <p><b>{post.caption}</b></p>
                            <p className=' text-sm'>#{post.topic}</p>
                        </div>
                        <video
                            controls
                            ref={videoRef}
                            loop
                            src={post.video.asset.url}
                            className='lg:w-[600px] h-[300px] md:h-[400px] lg:h-[528px] w-[200px] rounded-2xl cursor-pointer bg-black'/>
                    </div>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default VideoCard