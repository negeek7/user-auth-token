
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
    try {
        let { username, password } = req.body;

        if (!username || !password) return res.status(400).send("Username or password is missing!");

        let saltRounds = 10;
        let salt = await bcrypt.genSalt(saltRounds);
        let hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            password: hashedPassword,
        })
        await user.save()
        res.status(200).send("User successfully created!")

    } catch (error) {
        console.log("Error while sign up!", error)
        res.status(500).send("Error while creating a user!")
    }
})

