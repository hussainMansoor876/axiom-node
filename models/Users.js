const mongoose = require('mongoose')

const REQUIRED_STRING = {
    type: String,
    required: true
}

const userSchema = new mongoose.Schema({
    userName: {
        ...REQUIRED_STRING,
        trim: true,
        lowercase: true
    },
    firstName: {
        ...REQUIRED_STRING,
        trim: true
    },
    lastName: {
        ...REQUIRED_STRING,
        default: 'Pakistan Wala',
        trim: true
    },
    age: {
        type: Number
    },
    address: {
        home: REQUIRED_STRING,
        zipCode: REQUIRED_STRING,
        city: REQUIRED_STRING,
        province: REQUIRED_STRING,
        country: REQUIRED_STRING
    },
    email: {
        ...REQUIRED_STRING,
        unique: true,
        trim: true,
        lowercase: true
    },
    userEmails: Array,
    password: REQUIRED_STRING,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Users = mongoose.model('users', userSchema)

module.exports = Users