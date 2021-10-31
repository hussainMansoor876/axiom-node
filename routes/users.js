const express = require('express')
const router = express.Router()
const { AuthLogin } = require('../controllers/users')

router.post('/login', AuthLogin)

// router.post('/login', (req, res) => {
//     try {
//         console.log('post req', req?.body)
//         const { body } = req

//         if (body?.email === 'admin@admin.com' && body?.password === 'admin') {
//             return res.send({ message: 'Succesfully LoggedIn!', success: true, user: body })
//         }

//         return res.send({ message: 'Invalid email or Password!', success: false })
//     }
//     catch (e) {
//         console.log('e', e)
//         return res.send({ message: e?.message, success: false })
//     }
// })

module.exports = router