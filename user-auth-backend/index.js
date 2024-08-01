import express from express


const app = express()

app.listen(PORT, () => {
    console.log(`lisening on prt ${PORT}`)
})
