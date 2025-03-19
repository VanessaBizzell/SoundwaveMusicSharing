import { Request, Response, NextFunction } from 'express'

import * as Middleware from './middleware'
import userModel from './schemas/User'

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

    //old code, use it for local testing
    response.cookie("token", token, {
      httpOnly: true,
      secure: false,  // Set to true in production with HTTPS
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 * 7, // 7 days
      path: '/',
    });

    // Set the token as a cookie. New code, use when deploying to production (live)
    /*
    response.cookie(
        "token", 
        token, 
        { httpOnly: true, secure: process.env.NODE_ENV === "production", // Secure in production
                sameSite: 'none', // Required for cross-origin cookies
                maxAge: 24 * 60 * 60 * 1000 * 7, // 7 days
                path: '/'
        });
    */
    response.status(200).json( { "token": token } )
}

export const signup = async (request: Request, response: Response, next: NextFunction) => {

    const newUser = new userModel({
        username: 'qq',
        password: 'qq',
        email: 'qq'
    })

    await newUser.save()

    const user = await userModel.findOne({});
    response.status(200).json(user)
}