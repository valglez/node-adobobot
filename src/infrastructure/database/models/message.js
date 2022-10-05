const mongoose = require('mongoose')
const Schema = mongoose.Schema

const msgSchema = new Schema ({
    userId: {
        type: String,
        required: true
    },
    chatId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    msg: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('messages', msgSchema)