import React, { useEffect, useRef, useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import avatar from '../styles/images/avatar.jpg'

import { Video } from '../type';


interface IProps {
    post: Video
}
const VideoCard: NextPage<IProps> = ({ post }) => {

    const [playing, setPlaying] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    const onPress = () => {
        if(playing) {
            videoRef.current?.pause()
            setPlaying(false)
        }
        else {
            videoRef.current?.play()
            setPlaying(true)            
        }
    }

  return (
    <div className='flex flex-col pb-6'>
        <div className='flex gap-3 p-2 font-semibold rounded'>
            <div className='md:w-16 md:h-16 w-10 h-10 cursor-pointer'>
                <Link href={`/profile/${post.postedBy._id}`}>
                    <>
                        <Image
                            width={62}
                            height={62}
                            className='rounded-full'
                            src={post.postedBy?.image || avatar}
                            alt='profile photo'
                            layout='responsive'
                        />
                    </>
                </Link>
            </div>
            <div className='mt-2 '>
                <Link href={`/profile/${post.postedBy._id}`}>
                    <div className='items-center gap-2'>
                        <p className='flex gap-2 items-center md:text-md font-bold text-primary cursor-pointer'>
                            {post.postedBy.userName}
                            <GoVerified className='text-blue-400 text-md'/>
                        </p>
                    </div>
                </Link>
                <p className='text-slate-400 text-sm'>#{post.topic}</p>
            </div>
        </div>
        <div className='lg:ml-20 flex gap-4 relative'> 
            <div className='rounded-3xl'>
                <Link href={`/detail/${post._id}`}>
                    <div>
                        <div className='mb-5'>
                            <p><b>{post.caption}</b></p>
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