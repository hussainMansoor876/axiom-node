const bcrypt = require('bcryptjs')
const { Users } = require('../models')

const salt = bcrypt.genSaltSync(10)

const authLogin = (req, res) => {
    try {
        const { body } = req

        if (!body?.email || !body?.password) {
            return res.send({ success: false, message: 'Please provide all values!' })
        }

        Users.findOne({ email: body?.email }, async (err, response) => {
            if (err || !response) {
                return res.send({ message: 'Invalid email or Password!', success: false })
            }

            let isAuthenticated = bcrypt.compareSync(body?.password, response?.password)

            if (isAuthenticated) {
                let user = await Users.findById(response?._id, { __v: 0, password: 0 })

                return res.send({ message: 'Succesfully LoggedIn!', success: true, user })
            }

            return res.send({ message: 'Invalid email or Password!', success: false })
        })

        // Users.findOne({ email: body?.email, password: body?.password })
        //     .then((user) => {
        //         if (!user) {
        //             return res.send({ message: 'Invalid email or Password!', success: false })
        //         }
        //     })
        //     .catch((err) => {
        //         return res.send({ message: 'Invalid email or Password!', success: false })
        //     })

        // let user = await Users.findOne({ email: body?.email, password: body?.password })

        // console.log('user', user)
    }
    catch (e) {
        console.log('e', e)
        return res.send({ message: e?.message, success: false })
    }
}

const register = (req, res) => {
    try {
        const { body } = req

        if (!body?.email || !body?.userName || !body?.password) {
            return res.send({ success: false, message: 'Please provide all values!' })
        }

        body.password = bcrypt.hashSync(body?.password, salt)

        let user = new Users(body)

        user.save()
            .then(() => {
                return res.send({ success: true })
            })
            .catch((e) => {
                console.log('e', e)
                return res.send({ success: false, message: e?.message })
            })

        console.log('body', body)
    }
    catch (e) {
        console.log('e', e)
        return res.send({ message: e?.message, success: false })
    }
}

const getUsers = (req, res) => {
    try {
        const { body } = req

        Users.find({ 'userEmails.0': body?.email }, { __v: 0, password: 0 }, (err, users) => {
            if (err || !users?.length) {
                return res.send({ success: false, message: 'No User Found!' })
            }

            return res.send({ success: true, users })
        })

        // Users.find({ userEmails: { $in: body?.email } }, { __v: 0, password: 0 }, (err, users) => {
        //     if (err || !users?.length) {
        //         return res.send({ success: false, message: 'No User Found!' })
        //     }

        //     return res.send({ success: true, users })
        // })

        // Users.find({ 'address.zipCode': body?.zipCode }, { __v: 0, password: 0 }, (err, users) => {
        //     if (err || !users?.length) {
        //         return res.send({ success: false, message: 'No User Found!' })
        //     }

        //     return res.send({ success: true, users })
        // })

        // Users.find({ age: { $gte: body?.age, $lte: 100 } }, { __v: 0, password: 0 }, (err, users) => {
        //     if (err || !users?.length) {
        //         return res.send({ success: false, message: 'No User Found!' })
        //     }

        //     return res.send({ success: true, users })
        // })

        // Users.find({ $or: [{ userName: body?.userName }, { email: body?.email }] }, { __v: 0, password: 0 }, (err, users) => {
        //     if (err || !users?.length) {
        //         return res.send({ success: false, message: 'No User Found!' })
        //     }

        //     return res.send({ success: true, users })
        // })
    }
    catch (e) {
        console.log('e', e)
        return res.send({ message: e?.message, success: false })
    }
}

const addAddress = (req, res) => {
    try {
        const { id, address } = req?.body

        Users.findByIdAndUpdate(id, { address }, (err, user) => {
            if (err) {
                return res.send({ success: false, message: 'Something Went Wrong!' })
            }

            return res.send({ success: true })
        })
    }
    catch (e) {
        console.log('e', e)
        return res.send({ message: e?.message, success: false })
    }
}

const addEmail = (req, res) => {
    try {
        const { id, email } = req?.body

        Users.findByIdAndUpdate(id, { $push: { userEmails: email } }, (err, user) => {
            if (err) {
                return res.send({ success: false, message: 'Something Went Wrong!' })
            }

            return res.send({ success: true })
        })
    }
    catch (e) {
        console.log('e', e)
        return res.send({ message: e?.message, success: false })
    }
}

const deleteEmail = (req, res) => {
    try {
        const { id, email } = req?.body

        Users.findByIdAndUpdate(id, { $pull: { userEmails: email } }, (err, user) => {
            if (err) {
                return res.send({ success: false, message: 'Something Went Wrong!' })
            }

            return res.send({ success: true })
        })
    }
    catch (e) {
        console.log('e', e)
        return res.send({ message: e?.message, success: false })
    }
}

module.exports = {
    authLogin,
    register,
    getUsers,
    addAddress,
    addEmail,
    deleteEmail
}