import type { NextPage } from 'next'
import axios from 'axios'
import { Video } from '../type'
import VideoCard from '../components/VideoCard'
import NoResults from '../components/NoResults'
import { BASE_URL } from '../utils'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
interface IProps {
  videos: Video[]
}

const Home = ({ videos }: IProps) => {
  const [posts, setPosts] = useState(videos)
  const router = useRouter()
  const { topic }  = router.query

  useEffect(() => {
    setPosts(videos)
  }, [topic])

  return (
    <div className='flex flex-col gap-10 videos h-full'>
      {posts.length ? (
        posts.map((video : Video) => (
          <VideoCard post={video} key={video._id} setPosts={setPosts}/>
        ))
      ) : (
        <NoResults text={'No Videos'}/>
      )}
    </div>
  )
}

export const getServerSideProps = async ({
  query: { topic },
} : {
  query: { topic: string };
}) => {
  let response = await axios.get(`${BASE_URL}/api/post`);

  if(topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  }
  
  return {
    props: { videos: response.data },
  };
};
export default Home
