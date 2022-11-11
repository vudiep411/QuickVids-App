import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../utils/client'
import { uuid } from 'uuidv4'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'PUT') {
        const { userId, postId, like} = req.body
        // const likesArray = await client.fetch(`*[_type == "post" && _id == '${postId}'] {
        //     likes,
        // }`)
        // let isLike = like
        // for(let i = 0; i < likesArray.length; i++){
        //     if(likesArray[i]._ref === userId)
        //     isLike = false
        // }
        const data = like ? await client
            .patch(postId)
            .setIfMissing({likes: []})
            .insert('after', 'likes[-1]', [
                {
                    _key: uuid(),
                    _ref: userId
                }
            ])
            .commit()
            : await client
            .patch(postId)
            .unset([`likes[_ref=="${userId}"]`])
            .commit()

        res.status(200).json(data)
    }
}