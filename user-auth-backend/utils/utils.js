export function handleApiError(res, error, responseMessage, message){
    console.log(message, error)
    return res.status(500).send(responseMessage)
}