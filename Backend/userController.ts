
import { Request, Response, NextFunction } from 'express'

import * as Middleware from './src/middleware'

export const requestToken = async (request: Request, response: Response) => {

    const body: object = {
        "client_id": "1I62hHAfRZrlrIq7wLCliaOsTdchHvyA",
        "client_secret": "FHSXTfDD17y6Px5wRZSWivEh4MTzsCqk6M7lzhPaiysqYtO5lVb7IIJ937gdZ52V",
        "audience": "https://dev-ib3bna8dxfvytg5v.us.auth0.com/api/v2/",
        "grant_type": "client_credentials"
    }

    let token: string = 'NULL'

    await fetch('https://dev-ib3bna8dxfvytg5v.us.auth0.com/oauth/token',
    {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
        token = data['access_token']
        return data
    })
    .catch(error => console.error(error))

    /* STORE TOKEN FROM SERVER AUTHENTICATION */
    Middleware.session.token = token
    
    /* 
    response.set("Set-Cookie" `token=${token}`)
    */

    response.status(200).json( { "token": token } )
}