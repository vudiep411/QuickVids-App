import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../utils/client'
import { uuid } from 'uuidv4'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'PUT') {
        const { userId, followingID, follow } = req.body

        const data = follow ? await client
        .patch(followingID)
        .setIfMissing({followers: []})
        .insert('after', 'followers[-1]', [
            {
                _key: uuid(),
                _ref: userId
            }
        ])
        .commit()
        : await client
        .patch(followingID)
        .unset([`followers[_ref=="${userId}"]`])
        .commit()

        res.status(200).json(data)
    }
}