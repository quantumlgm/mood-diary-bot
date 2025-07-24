const { mainKeyboards, helpKeyboards } = require('./keyboards')
const { mainText, helpText } = require('./text-templates')

module.exports = (bot) => {
    bot.command('start', async (ctx) => {
        await ctx.reply(mainText.startText, {
            reply_markup: mainKeyboards.createMenuKeyboard(),
        })
    })
    bot.command('help', async (ctx) => {
        await ctx.reply(helpText.helpMenuText, {
            reply_markup: helpKeyboards.createHelpKeyboard(),
        })
    })
    bot.command('menu', async (ctx) => {
        await ctx.reply(mainText.menuText, {
            reply_markup: mainKeyboards.choiceMenu(),
        })
    })
}
