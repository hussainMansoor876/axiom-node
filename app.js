const express = require('express')
const cors = require('cors')
const app = express()

const PORT = 8080

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    try {
        return res.send({ message: 'Hello Nodejs Server is Running!', success: true })
    }
    catch (e) {
        console.log('e', e)
        return res.send({ message: e?.message, success: false })
    }
})

// app.post('/login', (req, res) => {
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

// app.put('/update', (req, res) => {
//     try {
//         console.log('put req', req?.body)

//         return res.send({ message: 'Succesfully Updated!', success: true })
//     }
//     catch (e) {
//         console.log('e', e)
//         return res.send({ message: e?.message, success: false })
//     }
// })

// app.delete('/delete', (req, res) => {
//     try {
//         console.log('delete req', req?.body)

//         return res.send({ message: 'Succesfully Deleted!', success: true })
//     }
//     catch (e) {
//         console.log('e', e)
//         return res.send({ message: e?.message, success: false })
//     }
// })

app.use('/', require('./routes'))

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}!!!`)
})