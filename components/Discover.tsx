import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { topics } from '../utils/constants';


const Discover: NextPage= ()  => {
    const activeTopicStyle = 'xl:border-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-gradient-to-r from-pink-400 to-pink-600 xl:border-[#db2777] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer bg-gradient-to-r from-pink-400 to-pink-600 text-white';
    const topicStyle = 'xl:border-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-gradient-to-r from-pink-400 to-pink-600 xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black';    
    const router = useRouter()
    const { topic } = router.query;

  return (
    <div className='xl:border-b-2 xl:white pb-6'>
        <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>
            Popular Topics
        </p>
        <div className='flex gap-3 flex-wrap'>
            {topics.map((item) => (
                <Link href={`/?topic=${item.name}`} key={item.name}>
                    <div className={topic === item.name ? activeTopicStyle : topicStyle}>
                        <span className='font-bold text-2xl xl:text-md'>{item.icon}</span>
                        <span className={`font-medium text-md hidden xl:block capitalize`}>{item.name}</span>
                    </div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Discover