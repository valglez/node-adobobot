const mongoose = require('mongoose')
const Schema = mongoose.Schema

const msgSchema = new Schema ({
    userId: {
        type: Number,
        required: true
    },
    chatId: {
        type: Number,
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