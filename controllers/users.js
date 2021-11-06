const { Users } = require('../models')

const AuthLogin = (req, res) => {
    try {
        const { body } = req

        if (body?.email === 'admin@admin.com' && body?.password === 'admin') {
            return res.send({ message: 'Succesfully LoggedIn!', success: true, user: body })
        }

        return res.send({ message: 'Invalid email or Password!', success: false })
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