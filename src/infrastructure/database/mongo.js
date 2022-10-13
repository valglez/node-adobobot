const Msg = require('./models/message')
const User = require('./models/user')

class Database {
    constructor(cache) {
        this.db = require('mongoose')
        this.cache = cache
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
    loadUsers() {
        const rawUsers = this.getUsernameFromDB()
        for (obj of rawUsers) {
            return this.cache.set(obj['userId'], obj['username'])
        }
    }
    getUsers(userId) {
        return this.cache.get(userId)
    }
    getUsernameFromDB() {
        return User.find()
    }
    async getUserById(userId) {
        try {
            return await User.findOne({ userId: userId })
        } catch (error) {
            return Promise.reject(error)
        }
    }
    async getUsernameById(userId) {
        try {
            const user = await User.findOne({ userId: userId })
            return user.username
        } catch (error) {
            return Promise.reject(error)
        }
    }
    async checkUserId(msg) {
        try {
            const userFromDb = await this.getUserById(msg.from.id)
            if (!userFromDb) {
                await this.storeUser(msg)
            }
        } catch (error) {
            return Promise.reject(error)
        }
    }
    async getMetricsByChatId(msg) {
        try {
            const users = await Msg.aggregate([
                {$match:{chatId:msg.chat.id}},
                {$group:{_id:'$userId',msg:{$sum:1}}},
                {$sort:{msg:-1}},
                {$project:{_id:0,msg:1,userId:'$_id'}}
        ])
        let response = ''
            for (const user of users) {
            response += `• El user ${await this.getUsernameById(user.userId)} ha enviado ${user.msg} mensajes\n`
            }
            response += `\nUsuario más activo: ${await this.getUsernameById(users[0].userId)}`
            return msg.reply.text(response)
        } catch (error) {
            return Promise.reject(error)
        }
    }
    async storeMsg(msg) {
        try {
            if (!msg.text.startsWith('/')) {
                const msgModel = new Msg({ userId: msg.from.id, chatId: msg.chat.id, date: msg.date, msg: msg.text })
                await msgModel.save()
            }
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