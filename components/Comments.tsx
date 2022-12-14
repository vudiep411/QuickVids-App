import React, { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { Avatar } from '@mui/material';

import useAuthStore from '../store/authStore';
import { IUser } from '../type';
import NoResults from './NoResults';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { BASE_URL } from '../utils';

interface IProps {
  isPostingComment: Boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: IComment[];
  postId: any;
  setPost: any;
  post: any
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref?: string; _id?: string };
}

const Comments = ({ comment, setComment, addComment, 
                    comments, isPostingComment, postId, 
                    setPost, post } : IProps
                  ) => {
                    
  const { userProfile, allUsers } : any = useAuthStore()

  const deleteComment = async (key : any) => {
    if(userProfile) {
      axios.delete(`${BASE_URL}/api/comments`, {data: {key: key, postId: postId }})
      const newComments = post?.comments.filter((item : any)=> item._key !== key)
      setPost({...post, comments: newComments})
    }
  }


  return (
    <div className='border-t-2 border-gray-600 pt-4 px-10 mt-4 border-b-2 lg:pb-0 pb-[100px] bg-[rgb(32,32,32)]' data-testid="comments">
      <div className='lg:h-[457px] lg:overflow-scroll'>
        {comments?.length > 0 ? (
          comments?.map((item: IComment, idx: number) => (
            <div key={idx}>
              {allUsers?.map(
                (user: IUser, i:number) =>
                  user._id === (item.postedBy._ref || item.postedBy._id) && (
                    <div className=' p-2 mb-2 items-center' key={i}>
                      <div className='flex items-start gap-3'>
                        <Link href={`/profile/${user._id}`}>
                          <div className='flex items-start gap-3'>
                            <div className='w-12 h-12 cursor-pointer'>
                              <Avatar
                                sx={{width: 48, height: 48}}
                                src={user.image}
                              />
                            </div>
                            <p className='flex cursor-pointer gap-1 items-center text-[18px] font-bold leading-6 text-[rgb(232,232,232)]'>
                              {user.userName}
                              <GoVerified className='text-blue-400' />
                            </p>
                          </div>
                        </Link>
                        {userProfile?._id === item.postedBy._id && 
                          <p 
                            className='text-[#dc2626] cursor-pointer transition ease-in-out delay-200 hover:-translate-y-1 hover:scale-110'
                            onClick={() => deleteComment(item._key)}
                          >
                            <DeleteIcon fontSize='small'/>
                          </p>
                        }
                      </div>
                      <div>
                        <p className='-mt-5 ml-16 text-[16px] mr-8 text-[rgb(232,232,232)]'>
                          {item.comment}
                        </p>
                      </div>
                    </div>
                  )
              )}
            </div>
          ))          
        ) : (
        <div>
          <NoResults text="No Comments Yet."/>
        </div>
        )}
      </div>

      {userProfile ? (
        <div className='absolute bottom-0 left-0 pb-6 px-2'>
          <form onSubmit={(e) => {
            addComment(e);
          }} className='flex gap-4'>
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className='bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg'
              placeholder='Add comment..'
            />
            <button className='text-md text-gray-300 hover:bg-gray-600 border-gray-400 border-2 p-2 rounded-xl' onClick={addComment}>
              {isPostingComment ? 'Commenting...' : 'Comment'}
            </button>
          </form>
        </div>
        ) : (
        <div>
          <h2 className='text-white mt-10'>
            <b>Sign in To comment!</b>
          </h2>
        </div>
      )}
    </div>
  )
}

export default Comments