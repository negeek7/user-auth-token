import jwt from 'jsonwebtoken'

export function handleApiError(res, error, responseMessage, message){
    console.log(message, error)
    return res.status(500).send(responseMessage)
}

export function createToken(payload, expiresIn = '30m') {
    let {username, role} = payload
    let token = jwt.sign({username, role}, process.env.JWT_SECRET_KEY, {
        expiresIn: expiresIn
    })
    return token
}