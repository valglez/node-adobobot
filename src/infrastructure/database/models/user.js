const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema ({
    userId: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        default: 'Anonymous',
        required: true
    }
})

module.exports = mongoose.model('users', userSchema)