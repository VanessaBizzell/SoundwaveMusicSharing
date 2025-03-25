import { Request, Response, NextFunction } from 'express'

import * as Middleware from './middleware'

import userModel from './schemas/User'

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
    let user = await userModel.findOne({username: request.body.username})
    if(!user) user = await userModel.findOne({email: request.body.username})
    if(user) {
        if(user.password == request.body.password) {
            const tokenRequest = await requestToken()
            token = tokenRequest['access_token']
            await user.updateOne({token: token})
            console.log(request.cookies)
            response.cookie('token', token)
        } else {
            errors.push("Unable to validate those credentials")
        }
    } else {
        errors.push("Username/Email doesn't exist")
    }

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