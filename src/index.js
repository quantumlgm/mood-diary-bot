require('dotenv').config()
const { Bot, GrammyError, HttpError } = require('grammy')

const commandsMenu = require('./modules/commands_menu')
const registerCommands = require('./modules/commands')
const { commandsHandler, callbackQuerryHandler } = require('./modules/handlers')
const pool = require('../db')

const bot = new Bot(process.env.BOT_KEY)

const launchFunction = async () => {
    //Меню комманд
    await commandsMenu(bot)

    // Комманды
    registerCommands(bot)

    //Обработчики
    commandsHandler(bot)
    callbackQuerryHandler(bot)

    bot.start()
}

bot.catch((err) => {
    const errCtx = err.ctx
    console.log(`Ошибка: ${errCtx.update.update_id}`)
    const error = err.error

    if (error instanceof GrammyError) {
        console.log('GrammyError', error.description)
    } else if (error instanceof HttpError) {
        console.log('HttpError:', error)
    } else {
        console.log('Unknown error', error)
    }
})

launchFunction()
