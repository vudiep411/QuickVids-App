import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { GoVerified } from 'react-icons/go';
import Link from 'next/link';
import {  MdOutlineCancel } from 'react-icons/md';
import { BASE_URL } from '../../utils';
import Avatar from '@mui/material/Avatar';
import useSound from 'use-sound';

import moment from 'moment'
import axios from 'axios';
import { Video } from '../../type';
import useAuthStore from '../../store/authStore';
import LikeButton from '../../components/LikeButton'
import Comments from '../../components/Comments'


interface IProps {
  postDetails: Video
}

const Detail = ({postDetails} : IProps) => {
  const [post, setPost] = useState(postDetails)
  const [comment, setComment] = useState('')
  const [isPostingComment, setIsPostingComment] = useState(false)
  const [playComment] = useSound('/sounds/mixkit-retro-game-notification-212.wav')
  const [playLike] = useSound('/sounds/pop.wav')

  const videoRef = useRef<HTMLVideoElement>(null)
  const { userProfile } : any = useAuthStore()
  const router = useRouter()
  const { id } : any = router.query

  if(!post) return null 

 const addComment = async (e : { preventDefault: () => void }) => {
    e.preventDefault()
    if(userProfile && comment) {
      setIsPostingComment(true)
      const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment
      })

      setPost({...post, comments: data.comments})
      setComment('')
      setIsPostingComment(false)
      playComment()
    }
 }
  return (
    <div>
      <div className='flex w-full absolute left-0 top-[55px] md:top-[68px] bg-[rgb(24,24,24)] flex-wrap lg:flex-nowrap'>
        <div className='relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black bg-no-repeat bg-cover bg-center'>
          <div className='opacity-90 absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
            <p className='cursor-pointer' onClick={() => {router.push('/')}}>
              <MdOutlineCancel className='text-white text-[35px] hover:opacity-90' />
            </p>
          </div>
          <div className='relative'>
            <div className='lg:h-[100vh] h-[60vh]'>
              <video
                controls
                ref={videoRef}
                src={post.video.asset.url}
                loop
                className=' h-full cursor-pointer'
              />
            </div>
          </div>
        </div>
        <div className='relative w-[1000px] md:w-[900px] lg:w-[700px]'>
          <div className='lg:mt-20 mt-10'>
            <Link href={`/profile/${post.postedBy._id}`}>
            <div className='flex gap-4 mb-4 bg-[rgb(24,24,24)] w-full pl-10 cursor-pointer'>
              <Avatar
                sx={{width: 62, height: 62}}
                src={post.postedBy.image}
              />
              <div>
                <div className='text-xl font-bold lowercase tracking-wider flex gap-2 items-center justify-center text-[rgb(232,232,232)]'>
                  {post.postedBy.userName.replace(/\s+/g, '')}
                  <GoVerified className='text-blue-400 text-xl' />
                </div>
                <p className='text-sm text-slate-400'>{moment(post.date).fromNow()}</p>
              </div>
            </div>
            </Link>
            <div className='px-10'>
              <p className=' text-md text-[rgb(232,232,232)]'>{post.caption}</p>
            </div> 
            <div className='mt-10 px-10'>
              {userProfile && (
                <LikeButton 
                  likes={post.likes}
                  setPost={setPost}
                  post={post}
                  playLike={playLike}
                />
              )}
            </div>
            <Comments 
              comment={comment}
              setComment={setComment}
              addComment={addComment}
              comments={post.comments}
              isPostingComment={isPostingComment}
              postId={id}
              setPost={setPost}
              post={post}
            />
          </div>
        </div>
      </div>
    </div>
    )
  }


  export const getServerSideProps = async ({
    params: { id },
  }: {
    params: { id: string };
  }) => {
    const res = await axios.get(`${BASE_URL}/api/post/${id}`);
  
    return {
      props: { postDetails: res.data },
    };
  };

export default Detail