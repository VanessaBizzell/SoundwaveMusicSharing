import { Request, Response, NextFunction } from 'express'

import * as Middleware from './middleware'

import userModel from './schemas/User'
import { ObjectId } from 'mongoose'

const requestToken = async (): Promise<Response> => {

    const body: object = {
        "client_id": "DPFEYYl4wqk8TFMsH3k9xGm8LNhN8Pk8",
        "client_secret": "w2Nz3GtFQaE5Ox1YAhnwAND-t_qNL1fM7XUh5CCPUlp_Gd_v56e6HLnuwIzECz90",
        "audience": "soundwave",
        "grant_type": "client_credentials"
    }

    let token: string = 'NULL'

    return await fetch('https://dev-ib3bna8dxfvytg5v.us.auth0.com/oauth/token',
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
}

export const validateLogin = async (request: Middleware.CustomRequest, response: Response, next: NextFunction) => {

    let errors: Array<string> = []
    let token = ''
    let maxAge = 1000 * 60 * 60 * 24
    let user = await userModel.findOne({username: request.body.username})

    if(!user) user = await userModel.findOne({email: request.body.username})
    if(user) {
        if(user.password == request.body.password) {
            const tokenRequest = await requestToken()
            console.log(tokenRequest)
            token = tokenRequest['access_token']
            maxAge = tokenRequest['expires_in'] * 1000
            await user.updateOne({token: token})
        } else {
            errors.push("Unable to validate those credentials")
        }
    } else {
        errors.push("Username/Email doesn't exist")
    }
    response.cookie("token", token, {
        httpOnly: true,
        maxAge: maxAge
    })   
    response.status(200).json({
        "errors": errors,
        "token": token
    })

}

export const signup = async (request: Request, response: Response, next: NextFunction) => {

    let errors: Array<string> = []

    console.log(request.body)

    if(await userModel.findOne({
        username: request.body.username
    }) !== null) {
        errors.push('Username already exists')
    }

    if(await userModel.findOne({
        email: request.body.email
    }) !== null) {
        errors.push('Email is already registered')
    }

    if(errors.length === 0) {
        const newUser = await new userModel({
            username: request.body.username,
            email: request.body.email,
            password: request.body.password
        })
        await newUser.save()
    }

    response.status(200).json({
        "errors": errors
    })
}

export const getCurrentUser = async (request: Request, response: Response, next: NextFunction) => {

    let token: string = ''
    let id: string = ''

    if(request.cookies.token) {
        token = request.cookies.token
        const user = await userModel.findOne({token: request.cookies.token})
        if(user) id = user.id
    }

    response.status(200).json({
        token,
        id
    })
} 

export const logout = (request: Request, response: Response, next: NextFunction) => {
    response.clearCookie('token')
    response.status(200).json({})
}