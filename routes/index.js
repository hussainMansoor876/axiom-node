const express = require('express')
const router = express.Router()

router.use('/auth', require('./users'))

// router.use('/search', require('./search'))

module.exports = router