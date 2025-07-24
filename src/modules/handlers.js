const { mainKeyboards, helpKeyboards } = require('./keyboards')
const { mainText, rest, helpText } = require('./text-templates')

// Основные
const commandsHandler = (bot) => {
    bot.on('message:text', async (ctx, next) => {
        if (ctx.session?.isInDialog) {
            return next() // Передаём управление conversation
        }
        await ctx.reply(rest.noText, {
            reply_markup: listMenuCommands(),
        })
    })
}

const callbackQueryHandler = (bot) => {
    bot.callbackQuery('menu', async (ctx) => {
        await ctx.answerCallbackQuery()
        await ctx.reply(mainText.menuText, {
            reply_markup: mainKeyboards.choiceMenu(),
        })
    })
    bot.callbackQuery('back-menu', async (ctx) => {
        await ctx.callbackQuery.message.editText(mainText.menuText, {
            reply_markup: mainKeyboards.choiceMenu(),
        })
    })

    // Помощь
    bot.callbackQuery('help-menu', async (ctx) => {
        await ctx.answerCallbackQuery()
        await ctx.callbackQuery.message.editText(helpText.helpMenuText, {
            reply_markup: helpKeyboards.createHelpKeyboard(),
        })
    })
    bot.callbackQuery('list-menu-commands', async (ctx) => {
        await ctx.answerCallbackQuery()
        await ctx.callbackQuery.message.editText(helpText.commandsMenuList, {
            reply_markup: helpKeyboards.backHelpKeyboard(),
        })
    })
    bot.callbackQuery('back-help-menu', async (ctx) => {
        await ctx.answerCallbackQuery()
        await ctx.callbackQuery.message.editText(helpText.helpMenuText, {
            reply_markup: helpKeyboards.createHelpKeyboard(),
        })
    })
}

module.exports = {
    commandsHandler,
    callbackQueryHandler,
}
