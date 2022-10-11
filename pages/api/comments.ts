import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../utils/client'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'DELETE') {
        const { key, postId } = req.body
        const data = await client.patch(postId)
        .unset([`comments[_key=="${key}"]`])
        .commit()
        res.json({data: 'ok'})
    }
}