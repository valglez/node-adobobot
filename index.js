const Connection = require('./src/storage/connection')
const Bot = require('./src/telegram/bot')
require('dotenv').config()

const {TOKEN, URI} = process.env

const bot = new Bot(TOKEN)
const conn = new Connection()

conn.connect(URI)
    .then(()=>{
        bot.run()
    })
    .catch((error)=>{
        console.log(error)
    })