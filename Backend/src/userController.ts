import { Request, Response, NextFunction } from 'express'

import * as Middleware from './middleware'

import userModel from './schemas/User'

const bcrypt = require('bcrypt')

const requestToken = async (): Promise<Response> => {

    const body: object = {
        "client_id": process.env.AUTH0_CLIENT_ID,
        "client_secret": process.env.AUTH0_CLIENT_SECRET,
        "audience": process.env.AUTH0_AUDIENCE,
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
        //compares the password entered with the hashed password in the database
        if(await bcrypt.compare(request.body.password, user.password)) {
            const tokenRequest = await requestToken()
            token = tokenRequest['access_token']
            maxAge = tokenRequest['expires_in'] * 1000
            await user.updateOne({token: token})
            response.cookie("token", token, {
                httpOnly: true,
                maxAge: maxAge
            })   
        } else {
            errors.push('Unable to validate credentials')   
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
    try {
        let errors: Array<string> = []

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
            // Define saltRounds as a number
            const saltRounds = 10;
            
            // Make sure password exists before hashing
            if (!request.body.password) {
                errors.push('Password is required');
            } else {
                const hashedPassword = await bcrypt.hash(request.body.password, saltRounds);
                
                const newUser = await new userModel({
                    username: request.body.username,
                    email: request.body.email,
                    password: hashedPassword
                }).save()
            }
        }

        response.status(200).json({
            "errors": errors
        })
    } catch (error) {
        console.error('Signup error:', error);
        response.status(500).json({ 
            error: 'Signup failed', 
            details: error instanceof Error ? error.message : 'Unknown error' 
        });
    }
}

// export const signup = async (request: Request, response: Response, next: NextFunction) => {

//     let errors: Array<string> = []

//     if(await userModel.findOne({
//         username: request.body.username
//     }) !== null) {
//         errors.push('Username already exists')
//     }

//     if(await userModel.findOne({
//         email: request.body.email
//     }) !== null) {
//         errors.push('Email is already registered')
//     }

//     if(errors.length === 0) {
//         const newUser = await new userModel({
//             username: request.body.username,
//             email: request.body.email,
//             password: await bcrypt.hash(request.body.password, process.env.salt)
//         }).save()
//     }

//     response.status(200).json({
//         "errors": errors
//     })
// }

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