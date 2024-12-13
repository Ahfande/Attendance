const mongoose = require ('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    id: {type: String, required: true},
    password: {type: String, required: true}
})

module.exports = mongoose.model('User', userSchema)