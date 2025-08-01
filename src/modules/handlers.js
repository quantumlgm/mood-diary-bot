const { getMainMenu } = require('../main-menu')
const { mainText, rest } = require('./text-templates')

const commandsHandler = (bot) => {
    bot.on('message:text', async (ctx, next) => {
        if (ctx.session?.isInDialog) {
            return next()
        }
        await ctx.reply(rest.noText, {
            reply_markup: listMenuCommands(),
        })
    })
}

const callbackQueryHandler = (bot) => {
    const mainMenu = getMainMenu()
    bot.callbackQuery('menu', async (ctx) => {
        await ctx.answerCallbackQuery()
        await ctx.reply(mainText.menuText, {
            reply_markup: mainMenu
        })
    })
}

module.exports = {
    commandsHandler,
    callbackQueryHandler,
}
