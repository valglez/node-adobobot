const Database = require('../../infrastructure/database/mongo')

class BotController {
    constructor(database) {
        this.db = database
    }
    async storeMsg(msg) {
        try {
          const msgModel = new Msg({userId: msg.from.id, chatId: msg.chat.id, date: msg.date, msg: msg.text})
          await this.db.msgModel.save()
        } catch (error) {
          return Promise.reject(error)
        }
    }
}

module.exports = BotController