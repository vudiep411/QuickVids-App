import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client'
 import { singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery } from '../../../utils/queries'



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'GET') {
        const { id }: any = req.query

        const query = singleUserQuery(id)
        const userVideosQ = userCreatedPostsQuery(id)
        const userLikedQ = userLikedPostsQuery(id)

        const user = await client.fetch(query)
        const userVideos = await client.fetch(userVideosQ)
        const userLikedVideos = await client.fetch(userLikedQ)
        res.status(200).json({user: user[0], userVideos, userLikedVideos})
    }
}