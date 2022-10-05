const Msg = require('./models/message')
const User = require('./models/user')

class Database {
    constructor() {
        this.db = require('mongoose')
    }
    /**
     * Connects to the database
     * @param {String} uri The URI with the credentials
     * @returns {Boolean} True if the connection was successfull, otherwise returns false
     */
    async connect(uri) {
        try {
            await this.db.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            console.log('Connected to database!')
            return true
        } catch (error) {
            console.log('Could not connect to database!', error)
            return false
        }
    }
    async getUserById(userId) {
        try {
            return await User.findOne({ userId: userId })
        } catch (error) {
            return Promise.reject(error)
        }
    }
    async getUsernameById(username) {
        try {
            return await User.findOne({ username: username })
        } catch (error) {
            return Promise.reject(error)
        }
    }
    async checkUser(msg) {
        try {
            const userFromDb = await this.getUserById(msg.from.id)
            if (!userFromDb) {
                await this.storeUser(msg)
            }
        } catch (error) {
            return Promise.reject(error)
        }
    }
    async storeMsg(msg) {
        try {
            const msgModel = new Msg({ userId: msg.from.id, chatId: msg.chat.id, date: msg.date, msg: msg.text })
            await msgModel.save()
        } catch (error) {
            return Promise.reject(error)
        }
    }
    async storeUser(msg) {
        try {
            const userModel = new User({ userId: msg.from.id, username: msg.from.username })
            await userModel.save()
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

module.exports = Database