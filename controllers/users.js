const bcrypt = require('bcryptjs')
const { Users } = require('../models')

const salt = bcrypt.genSaltSync(10)

const AuthLogin = (req, res) => {
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

const Register = (req, res) => {
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

    }
}

module.exports = {
    AuthLogin,
    Register
}