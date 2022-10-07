const Telebot = require('telebot')

class Bot {
    constructor(token, database) {
        this.bot = new Telebot(token)
        this.db = database
    }
    launch() {
        this.bot.on(['/start', '/hola'], (msg) => msg.reply.text('¡Hola!'))
        this.bot.on('/metrics', (msg) => this.db.getMetricsByChatId(msg))
        this.bot.on('text', (msg) => this.db.storeMsg(msg))
        this.bot.on('text', (msg) => this.db.checkUserId(msg))
        this.bot.start()
        console.log('Bot started!')
    }
}

module.exports = Bot