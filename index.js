const Database = require('./src/infrastructure/database/mongo')
const Bot = require('./src/application/telegram/bot')
const Cache = require('./src/cache/cache')
require('dotenv').config()

const { TOKEN, URI } = process.env
const cache = new Cache()
const db = new Database(cache)
const bot = new Bot(TOKEN, db)
db.connect(URI)
    .then(() => {
        bot.launch()
//        db.loadUsers()
    })
    .catch((error) => {
        console.log(error)
    })