
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from './schema/userSchema.js'
import { handleApiError } from "./utils/utils.js";

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

app.use(express.json())

app.listen(PORT, () => {
    console.log(`lisening on port ${PORT}`)
})

app.get('/', (req, res) => {
    res.send(`Hello my name is ${process.env.NAME}`)
})


app.post('/signup', async (req, res) => {
    try {
        let { username, password } = req.body;

        if (!username || !password) return res.status(400).send("Username or password is missing!");

        let saltRounds = 10;
        let salt = await bcrypt.genSalt(saltRounds);
        let hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            password: hashedPassword,
            role: 'admin'
        })
        await user.save()
        res.status(200).send("User successfully created!")
    } catch (error) {
        console.log("Error while sign up!", error)
        handleApiError(res, error, "Trouble creating user", "sign up api error")
    }
})


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

        let passwordResult = await bcrypt.compare(password, user.password)
        if (passwordResult) {
            let token = jwt.sign({ username: user.username, role: user.role ? user.role : '' }, process.env.JWT_SECRET_KEY, {
                expiresIn: '30m'
            })
            return res.status(200).json({ message: "Authenticated", token })
        } else {
            return res.status(401).send("Wrong password! Check again.")
        }


    } catch (error) {
        handleApiError(res, error, "Trouble signing in user", "sign in api error")
    }
})


// create a user (only user with role admin can create user)

app.post('/createuser', async (req, res) => {
    let { username } = req.body
    if (!username) return res.status(400).send("Please provide username")
    try {
        let user = User.findOne({ username: { $eq: username } })
        if (!user) return res.status(404).send("User does not exist!")
        let usertoken = req.headers.authorization.split(' ')[1]
        if (usertoken) {
            let userInfo = jwt.decode(usertoken)
            if (userInfo.role == 'admin') {
                let saltRounds = 10;
                let salt = await bcrypt.genSalt(saltRounds);
                let password = 'randompassword123'
                let hashedPassword = await bcrypt.hash(password, salt);
                const user = new User({
                    username,
                    password: hashedPassword,
                    role: 'user'
                })
                await user.save()
                res.status(200).send("User successfully created!")
            } else {
                res.status(400).send("You do not have permission to create a user!")

            }
        }
    } catch (error) {
        handleApiError(res, error, "Error creating user", "create user api error")
    }
})