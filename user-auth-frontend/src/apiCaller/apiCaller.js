
export default async function apiCaller(path, method = "GET", body = {}) {
    console.log("http://localhost:8001" + path, "PATH")
    let headers = {
        'content-type': 'application/json'
    }   
    let response = await fetch("http://localhost:8001/" + path, {
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