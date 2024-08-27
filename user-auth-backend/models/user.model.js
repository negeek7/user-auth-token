import mongoose from 'mongoose'
import { todosSchema } from './todos.model.js'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: String,
    todos: [todosSchema]

    // timestamps true automatically adds {createdAt} {updatedAt} keys
}, {versionKey: false, timestamps: true })


export const User = mongoose.model('user', userSchema)
