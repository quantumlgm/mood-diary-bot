const { saveMessage } = require('../db-operations/request-templates')

const commandsHandler = (bot) => {
    bot.on('message:text', async (ctx) => {
        const text = ctx.message.text

        try {
            await saveMessage(text)
            await ctx.reply('Сообщение сохранено', text)
        } catch (err) {
            console.log(`💥 Обнаружена ошибка:`, err)
        }
    })
}

const callbackQuerryHandler = (bot) => {
    bot.callbackQuery('button-help', async (ctx) => {
        await ctx.answerCallbackQuery()
        await ctx.reply('Вы нажали на кнопку')
    })
}

module.exports = {
    commandsHandler,
    callbackQuerryHandler,
}
