
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from 'cors';
import bodyParser from "body-parser";
import { User } from './schema/userSchema.js'
import { handleApiError, isTokenExpired } from "./utils/utils.js";

const app = express();
const PORT = process.env.PORT;

(async function () {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: "userauth"
        })
        console.log("Connected to database ✅")
    } catch (error) {
        ConsoleError(error, "xxx Error connecting to database xxx")
    }
})();

let corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(express.json())
app.use(cors(corsOptions))
let jsonParser = bodyParser.json()

app.listen(PORT, () => {
    console.log(`lisening on port ${PORT}`)
})

app.get('/', (req, res) => {
    res.send(`Hello my name is ${process.env.NAME}`)
})

app.post('/signup', async (req, res) => {
    console.log(req.body, "req.body")
    try {
        let { username, password } = req.body;
        console.log(username, password)
        // check if client has sent token - create new user
        if (req.headers.authorization) {
            let usertoken = req.headers.authorization.split(' ')[1]
            let userInfo = jwt.decode(usertoken)
            console.log(userInfo, "userInfo")

            // let isExpired = isTokenExpired(userInfo.exp)
            // if(isExpired) return res.status(400).send("Token has been expired")

            let verifyToken = jwt.verify(usertoken, process.env.JWT_SECRET_KEY)
            if (verifyToken) {
                console.log(verifyToken, "verifyToken")
                let randomPassword = "randomPass123"
                return createUser(username, randomPassword, 'user', res)
            }
        }
        // sign up user
        if (!username || !password) return res.status(400).json({status: "Error", message: "Username or password is missing!"});
        return createUser(username, password, 'admin', res)
    } catch (error) {
        console.log("Error while sign up!", error)
    }
})

async function createUser(username, password, role, res) {
    console.log("create user")
    try {
        let user = await User.findOne({ username: { $eq: username } })
        if (user) return res.status(400).json({ status: "Error", message: "user already exists" })
        let saltRounds = 10;
        let salt = await bcrypt.genSalt(saltRounds);
        let hashedPassword = await bcrypt.hash(password, salt);
        let newUser = new User({
            username: username,
            password: hashedPassword,
            role: role
        })
        await newUser.save()
        return res.status(200).send("User successfully created!")
    } catch (error) {
        console.log("Error while sign up!", error)
        return handleApiError(res, error, "Trouble creating user", "sign up api error")
    }
}


app.post('/signin', async (req, res) => {
    // take username and password
    // find user
    // get hashedPassword
    // match with the input user password
    try {
        let { username, password } = req.body
        if (!username || !password) return res.status(400).send("Username or password missing!")
        let user = await User.findOne({ username: { $eq: username } }, { created_at: 0 })

        if (!user) return res.status(404).send("User does not exist!")

        console.log(user, "user found")

        let passwordResult = await bcrypt.compare(password, user.password)
        if (passwordResult) {
            let token = jwt.sign({ username: user.username, role: user.role ? user.role : '' }, process.env.JWT_SECRET_KEY, {
                expiresIn: '30m'
            })
            return res.status(200).json({
                message: "Authenticated", user: {
                    username,
                    token
                }
            })
        } else {
            return res.status(401).send("Wrong password! Check again.")
        }
    } catch (error) {
        handleApiError(res, error, "Trouble signing in user", "sign in api error")
    }
})