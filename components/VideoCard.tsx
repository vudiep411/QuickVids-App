import React, { useRef } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import moment from 'moment';
import Popup from './Popup';
import { Avatar } from '@mui/material';

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
    const router = useRouter()

const handleDelete = async () => {
    await axios.delete(`${BASE_URL}/api/post/delete`, {data: {id: post._id}})
    router.reload()
}


  return (
    <div className='flex flex-col pb-6'>
        <div className='flex gap-3 p-2 font-semibold rounded'>
            <div className='md:w-16 md:h-16 w-10 h-10 cursor-pointer'>
                <Link href={`/profile/${post.postedBy._id}`}>
                    <div className='mt-2'>
                        <Avatar                             
                            sx={{display: { xs: 'none', md: 'block' },
                            width: 60, 
                            height: 60}}
                            src={post.postedBy?.image}
                        />
                        <Avatar                             
                            sx={{display: { xs: 'block', md: 'none' },
                            width: 40, 
                            height: 40,
                            marginTop: '13px'
                        }}
                            src={post.postedBy?.image}
                        />                        
                    </div>
                </Link>
            </div>
            <div className='mt-2 '>
                <div className='flex gap-6'>
                    <div className='flex gap-2'>
                        <Link href={`/profile/${post.postedBy._id}`}>
                            <div className='items-center gap-2'>
                                <p className='flex gap-2 items-center md:text-md font-bold text-[rgb(232,232,232)] cursor-pointer'>
                                    {post.postedBy.userName}
                                    <GoVerified className='text-blue-400 text-md'/>
                                </p>
                            </div>
                        </Link>
                    </div>
                    { (userProfile && userProfile._id === post.postedBy._id) &&
                    <div className=''>
                        <Popup handleDelete={handleDelete}/>
                    </div>
                    }
                </div>
                <p className='text-slate-400 text-sm mb-2'>{moment(post.date).fromNow()}</p>
            </div>
        </div>
        <div className='lg:ml-20 md:ml-20 sm:ml-[0px] flex gap-4 relative'> 
            <div className='rounded-3xl'>
                <Link href={`/detail/${post._id}`}>
                    <div>
                        <div className='mb-5'>
                            <p className='text-[rgb(232,232,232)] cursor-pointer'><b>{post.caption}</b></p>
                            <p className='text-sm text-slate-400'>#{post.topic}</p>
                        </div>
                    </div>
                </Link>
                <video
                    controls
                    ref={videoRef}
                    loop
                    src={post.video.asset.url}
                    className='w-[300px] h-[400px] md:h-[400px] md:w-[500px] lg:w-[600px] lg:h-[528px] rounded-2xl cursor-pointer bg-black'
                />
                <div className='flex gap-5 mt-2'>
                    <a href={`/detail/${post._id}`} className='text-[rgb(232,232,232)] cursor-pointer'><b>{post?.likes?.length || 0}</b> Likes</a>
                    <a href={`/detail/${post._id}`} className='text-[rgb(232,232,232)] cursor-pointer'><b>{post?.comments?.length || 0}</b> Comments</a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default VideoCard