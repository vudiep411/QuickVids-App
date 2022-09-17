import React, { useState } from 'react';
import { SanityAssetDocument } from '@sanity/client';
import { useRouter } from 'next/router';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { ThreeDots } from 'react-loading-icons';

import axios from 'axios';
import useAuthStore from '../store/authStore';
import { client } from '../utils/client';
import { topics } from '../utils/constants';
import { BASE_URL } from '../utils';

const Upload = () => {
    const [isLoading, setIsLoading] = useState<Boolean>(false)
    const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined> ()
    const [wrongFile, setWrongFile] = useState<Boolean>(false)
    const [caption, setCaption] = useState<string>('')
    const [topic, setTopic] = useState<string>('')
    const [savingPost, setSavingPost] = useState<Boolean>(false)
    const [missing, setMissing] = useState<string>()
    const [file, setFile] = useState('')

    const { userProfile } : {userProfile: any}= useAuthStore()
    const router = useRouter()

    // handle video upload
    const uploadVideo = async (e: any) => {
        const selectedFile = e.target.files[0]
        const fileTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/mov', 'video/quicktime']
        
        if(fileTypes.includes(selectedFile.type)) {
            setIsLoading(true)
            client.assets.upload('file', selectedFile, {
                contentType: selectedFile.type,
                filename: selectedFile.name
            }).then((data) => {
                setVideoAsset(data)
                setIsLoading(false)
            })
        } else {
            setIsLoading(false)
            setWrongFile(true)
            setFile(selectedFile.type)
        }
    }
    
    // handle submit post
    const handlePost = async () => {
        if(caption && videoAsset?._id && topic) {
            setSavingPost(true)
            const document = {
                _type: 'post',
                caption,
                video: {
                    _type: 'file',
                    asset: {
                        _type: 'reference',
                        _ref: videoAsset?._id
                    }
                },
                userId: userProfile?._id,
                postedBy: {
                    _type: 'postedBy',
                    _ref: userProfile?._id
                },
                topic: topic
            }
            await axios.post(`${BASE_URL}/api/post`, document)
            router.push('/')
        }
        else
        {   
            setMissing('Please fill out all fields !')
        }
    }

    const handleDiscard = () => {
        setVideoAsset(undefined)
        setWrongFile(false)
        setCaption('')
        setTopic('')
        setMissing('')
    }
  return (
    <div className='flex w-full absolute left-0 mb-10 lg:mt-[10px] bg-[rgb(24,24,24)] justify-center h-[100vh]'>
        <div className='rounded-lg flex gap-6 flex-wrap justify-center items-center p-14 pt-6'>
            <div>
                <div>
                    <p className='text-2xl font-bold text-[rgb(232,232,232)]'>Upload Video</p>
                    <p className='text-md text-gray-400 mt-1'>Post a Video</p>
                </div>
                <div className='border-dashed rounded-xl border-4 lg:border-[rgb(232,232,232)] md:border-[rgb(232,232,232)] border-[rgb(232,232,232)] flex flex-col justify-center items-center  outline-none mt-10 w-[260px] h-[458px] p-10 cursor-pointer hover:border-red-300 hover:bg-[rgb(48,48,48)]'>
                    {isLoading ? (
                        <div className='items-center flex flex-col'>
                            <p className='font-bold text-white'>Uploading...</p>
                            <p className='mt-5'><ThreeDots fill='#FF1493' strokeWidth={2}/></p>
                        </div>
                        ) : (
                        <div>
                            {videoAsset ? (
                                <div className=' rounded-3xl w-[300px]  p-4 flex flex-col gap-6 justify-center items-center'>
                                    <video
                                        src={videoAsset.url}
                                        loop
                                        controls
                                        className='rounded-xl h-[462px] mt-1 bg-black'
                                    >
                                    </video>
                                </div>
                            ) : (
                            <div>
                                <label className='cursor-pointer'>
                                    <div className='flex flex-col items-center justify-center h-full'>
                                        <div className='flex flex-col justify-center items-center'>
                                            <p className='font-bold text-xl'>
                                                <FaCloudUploadAlt className='text-white text-6xl'/>
                                            </p>
                                            <p className='text-xl text-[rgb(232,232,232)] font-semibold'>Upload a Video</p>
                                        </div>
                                        <p className='text-gray-400 text-center mt-10 text-sm leading-10'>
                                            mp4, webM, ogg <br/>
                                            720x1280 or higher<br/>
                                            Up to 10 mins<br/>
                                            Less than 2GB
                                        </p>
                                        <p className='bg-[rgb(64,64,64)] text-center mt-8 rounded text-white text-md font-medium p-2 w-52 outline-none'>
                                            Select File
                                        </p>
                                        <input
                                            type='file'
                                            name='upload-video'
                                            onChange={uploadVideo}
                                            className='w-0 h-0'
                                        />
                                    </div>
                                </label>
                            </div>
                            )}
                        </div>
                    )}
                </div>
                {wrongFile && (
                    <p className='text-center text-xl text-red-400 font-semibold mt-4 w-[260px]'>File is invalid!! {file}</p>
                )}
            </div>
            { missing && 
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{missing}</span>
                </div>
            }
            {/* form caption and topics*/}
            <div className='flex flex-col gap-3 pb-10'>
                    <label className='text-md font-medium text-[rgb(232,232,232)]'>Caption</label>
                <input
                    type='text'
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className='rounded outline-none text-md border-2 border-gray-200 p-2'
                />
                <label className='text-md font-medium text-[rgb(232,232,232)]'>Choose a topic</label>

                <select
                    defaultValue=''
                    onChange={(e) => setTopic(e.target.value)}
                    className='outline-none lg:w-650 border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer'
                >
                    <option>Select topics</option>
                    {topics.map((item) => (
                    <option
                        key={item.name}
                        className=' outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300'
                        value={item.name}
                    >
                        {item.name}
                    </option>
                    ))}
                </select>

                <div className='flex gap-6 mt-10'>
                    <button
                        onClick={handleDiscard}
                        type='button'
                        className='border-gray-300 border-2 text-md text-white font-medium p-2 rounded w-28 lg:w-44 outline-none bg-[rgb(64,64,64)]'
                    >
                        Discard
                    </button>
                    <button
                        onClick={handlePost}
                        type='button'
                        className='bg-[#3b82f6] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none cursor-pointer hover:bg-[#2563eb]'
                    >
                        {savingPost ? 'Posting...' : 'Post'}
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Upload