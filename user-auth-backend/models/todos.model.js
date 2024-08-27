import mongoose from 'mongoose'

export const todosSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"]
    },
    items: Array,
    done: {
        type: Boolean,
        default: false
    },
    completedOn: Date,
    dueDate: Date
}, {timestamps: true})
