
import { Request, Response, NextFunction } from 'express'

import * as Middleware from './middleware'

export const requestToken = async (request: Request, response: Response) => {

    const body: object = {
        "client_id": "DPFEYYl4wqk8TFMsH3k9xGm8LNhN8Pk8",
        "client_secret": "w2Nz3GtFQaE5Ox1YAhnwAND-t_qNL1fM7XUh5CCPUlp_Gd_v56e6HLnuwIzECz90",
        "audience": "soundwave",
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