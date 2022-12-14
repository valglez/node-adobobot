const dataController = require('./src/infrastructure/database/data-controller')
const Bot = require('./src/application/telegram/bot')
const Cache = require('./src/cache/cache')
require('dotenv').config()

const { TOKEN, URI } = process.env
const cache = new Cache()
const ctrl = new dataController(cache)
const bot = new Bot(TOKEN, ctrl)
ctrl.connect(URI)
  .then(() => {
    bot.launch()
    ctrl.loadUsers()
  })
  .catch((error) => {
    console.log(error)
  })