
export default async function apiCaller(path, method = "GET", body = {}) {
    let headers = {
        'content-type': 'application/json'
    }
    let response = await fetch(import.meta.env.VITE_LOCAL_API_URL + path, {
        method,
        headers,
        body: JSON.stringify(body)
    })
    console.log(response, "RESPONSE")
}