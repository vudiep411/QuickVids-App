import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client'
import { getFollowersQuery, getFollowersInfo } from '../../../utils/queries'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'GET') {
        const { id } : any = req.query
        const query = getFollowersQuery(id)
        const followers = await client.fetch(query)
        let followersData = []
        if(followers[0].followers)
        {
            for(let i = 0; i < followers[0].followers.length; i++) {
                const userQuery = getFollowersInfo(followers[0].followers[i]._ref)
                const user = await client.fetch(userQuery)
                followersData.push(user[0])
            }
        }

        res.status(200).json(followersData)
    }
}