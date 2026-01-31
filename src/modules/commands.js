const {
    mainMenu,
    helpMenu,
    createNoteMenu,
    historyNotesMenu,
    statisticsMenu,
} = require('../main-menu')
const { mainKeyboards } = require('./keyboards')
const {
    mainText,
    helpText,
    createPostText,
    checkNoteHistory,
    statisticsText,
} = require('./text-templates')

async function registerCommands(bot) {
    bot.command('start', async (ctx) => {
        await ctx.reply(mainText.startText, {
            reply_markup: mainKeyboards.menuKeyboard(),
        })
    })
    bot.command('menu', async (ctx) => {
        await ctx.reply(mainText.menuText, {
            reply_markup: mainMenu,
        })
    })
    bot.command('help', async (ctx) => {
        await ctx.reply(helpText.helpMenuText, {
            reply_markup: helpMenu,
        })
    })
    bot.command('create', async (ctx) => {
        await ctx.reply(createPostText.initialTextNote, {
            reply_markup: createNoteMenu,
        })
    })
    bot.command('history', async (ctx) => {
        await ctx.reply(checkNoteHistory.checkTextNote, {
            reply_markup: historyNotesMenu,
        })
    })
    bot.command('stats', async (ctx) => {
        await ctx.reply(statisticsText.statisticsMenuText, {
            reply_markup: statisticsMenu,
        })
    })
}

module.exports = {
    registerCommands,
}
