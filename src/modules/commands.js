const createHelpKeyboard = require('./keyboards')

module.exports = (bot) => {
    bot.command('start', async (ctx) => {
        await ctx.reply('Бот запущен')
    })
    bot.command('help', async (ctx) => {
        await ctx.reply('Написать в поддержку:', {
            reply_markup: createHelpKeyboard(),
        })
    })
}
