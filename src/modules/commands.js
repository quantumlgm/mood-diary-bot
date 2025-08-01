const { createMenuKeyboard } = require('./keyboards')
const { mainText } = require('./text-templates')

async function registerCommands(bot) {
    bot.command('start', async (ctx) => {
        await ctx.reply(mainText.startText, {
            reply_markup: createMenuKeyboard(),
        })
    })
}

module.exports = {
    registerCommands,
}
