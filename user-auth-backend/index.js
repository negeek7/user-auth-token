
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from './schema/userSchema.js'
import { ConsoleError } from "./utils/utils.js";

const app = express();
const PORT = process.env.PORT;

(async function () {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: "userauth"
        })
        console.log("Connected to database...")
    } catch (error) {
        ConsoleError(error, "xxx Error connecting to database xxx")
    }
})();

app.use(express.json())

app.listen(PORT, () => {
    console.log(`lisening on port ${PORT}`)
})

app.get('/', (req, res) => {
    res.send(`Hello my name is ${process.env.NAME}`)
})


app.post('/signup', async (req, res) => {
    console.log(req.body);
    if (!req.body) return res.send("Body is missing!")
    let saltRounds = 6;
    let creds = req.body;
    if (!creds.username || !creds.password) return res.send("Username or password is missing!")
    const user = {
        name: creds.username,
        password: creds.password
    }
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(creds.password, salt, async (err, hash) => {
            try {
                user.password = hash
                await User.create(user)
                res.send("User successfully created")
            } catch (err) {
                console.log(err, "ERROR")
                res.status(401).send("User couldnt be created")
            }
            
        })
    })
})

