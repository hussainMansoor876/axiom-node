const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    task: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Todos = mongoose.model('todos', todoSchema)

module.exports = Todos