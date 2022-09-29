const Telebot = require('telebot')

class Bot {
    constructor(token) {
        this.bot = new Telebot(token)
    }
    run() {
        this.bot.on(['/start', '/hola'], (msg) => msg.reply.text('¡Hola!'))
        this.bot.start()
    }
}

module.exports = Bot