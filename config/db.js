const mongoose = require('mongoose')


let driverUrl = `mongodb+srv://admin:admin@cluster0.3qa5h.mongodb.net/nodeExample?retryWrites=true&w=majority`

mongoose.connect(driverUrl)

module.exports = mongoose