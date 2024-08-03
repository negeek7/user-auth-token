import mongoose, { mongo } from 'mongoose'


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
}, {versionKey: false})

export const User = mongoose.model('user', userSchema)
