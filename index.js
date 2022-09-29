const Bot = require('./src/telegram/bot')

const bot = new Bot(process.env.token)

bot.run()