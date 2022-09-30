const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema ({
    userId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('users', userSchema)