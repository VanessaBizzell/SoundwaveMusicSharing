import { Request, Response, NextFunction } from "express"

const axios = require('axios')
const { auth } = require('express-oauth2-jwt-bearer')

export interface CustomRequest extends Request {
    session?: any
}

export const authenticateRequest = auth({
    audience: 'soundwave',
    issuerBaseURL: 'https://dev-ib3bna8dxfvytg5v.us.auth0.com',
    tokenSigningAlg: 'RS256'
})