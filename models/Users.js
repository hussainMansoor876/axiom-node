const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        default: 'Pakistan Wala',
        trim: true
    },
    age: {
        type: Number
    },
    address: {
        type: Object
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Users = mongoose.model('users', userSchema)

module.exports = Users