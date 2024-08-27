
export default async function apiCaller(path, method = "GET", body = {}) {
    let headers = {
        'content-type': 'application/json'
    }   
    let response = await fetch(path, {
        method, 
        headers,
        body: JSON.stringify(body)
    })
    if(!response.ok) {
        throw new Error("Error")
    } else {
        return await response.json()
    }
}