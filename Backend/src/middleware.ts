import { Request, Response, NextFunction } from "express"

const axios = require('axios')
const { auth } = require('express-oauth2-jwt-bearer')

export var session = {
    secret: 'SECRET_GOES_HERE',
    cookie: { secure: true },
    token: ''
}

export const authenticateRequest = auth({
    audience: 'soundwave',
    issuerBaseURL: 'https://dev-ib3bna8dxfvytg5v.us.auth0.com',
    tokenSigningAlg: 'RS256'
})

export const authenticate = async (request: Request, response: Response, next: NextFunction) => {

    auth({
        audience: 'musicapp',
        issuerBaseURL: 'https://dev-ib3bna8dxfvytg5v.us.auth0.com',
        tokenSigningAlg: 'RS256'
    });

    console.log('Authenticating...\n\n', session.token)

    /*
    await fetch('https://dev-ib3bna8dxfvytg5v.us.auth0.com/', {
        headers: { 
            "authorization": `Bearer ${session.token}`,
            "Content-Type": 'text/html' },
        credentials: 'include'
    })
    .then(response => {
        console.log(response.text())
        return response.body
    })
    .then(data => {
        console.log(data)
    }).catch(error => console.error(error))

    */

    /*
    axios({
        method: 'GET',
        url: 'https://dev-ib3bna8dxfvytg5v.us.auth0.com/',
        headers: {
            'authorization': `Bearer ${session.token}`
        }
    })
    .then(response => {
        console.log(response.data)
    })
    */

    next()
}

