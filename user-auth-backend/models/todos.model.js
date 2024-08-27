
import mongoose from 'mongoose'

export const todosSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: Boolean,
    completedOn: Date
})
