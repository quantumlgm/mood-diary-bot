require('dotenv').config()
const { Bot, GrammyError, HttpError, session } = require('grammy')
const { hydrate } = require('@grammyjs/hydrate')
const { conversations, createConversation } = require('@grammyjs/conversations')
const { freeStorage } = require('@grammyjs/storage-free')

const commandsMenu = require('./modules/commands_menu')
const registerCommands = require('./modules/commands')
const { commandsHandler, callbackQueryHandler } = require('./modules/handlers')
const pool = require('../db')
const { setupCreateDialog } = require('./modules/create-notes/create-note')

const bot = new Bot(process.env.BOT_KEY)
bot.use(hydrate())
bot.use(
    session({
        initial: () => ({
            isInDialog: false,
        }),
        storage: freeStorage(process.env.BOT_KEY),
    }),
)
bot.use(conversations())

const launchFunction = async () => {
    //Меню комманд
    await commandsMenu(bot)

    // Комманды
    registerCommands(bot)

    //Создание записи
    setupCreateDialog(bot)

    //Обработчики
    commandsHandler(bot)
    callbackQueryHandler(bot)

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
