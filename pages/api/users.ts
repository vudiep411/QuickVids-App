import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../utils/client'
import { allUsersQuery } from '../../utils/queries'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'GET') {
        const data = await client.fetch(allUsersQuery())

        if(data)
            res.status(200).json(data)
        else
            res.status(200).json([])

    }
    else if(req.method === 'PUT'){
        const {id, name, username, image} = req.body
        await client
        .patch(id)
        .set({name: name, userName: username, image: image})
        .commit()
        res.status(200).json({message: 'success'})
    }
}