const Database = require('./src/infrastructure/database/mongo')
const Bot = require('./src/application/telegram/bot')
require('dotenv').config()

const { TOKEN, URI } = process.env
const db = new Database()
const bot = new Bot(TOKEN, db)

db.connect(URI)
    .then(() => {
        bot.launch()
    })
    .catch((error) => {
        console.log(error)
    })