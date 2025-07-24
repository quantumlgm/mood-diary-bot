const { createConversation } = require('@grammyjs/conversations')

async function createDialog(conversation, ctx) {
    ctx.session = ctx.session || {}
    ctx.session.isInDialog = true

    try {
        await ctx.reply('Какое у тебя настроение?')
        const mood = await conversation.form.text()

        await ctx.reply('Напиши комментарий дня')
        const comment = await conversation.form.text()

        await ctx.reply('Отправь фото дня')
        const photo = await conversation.form.photo()

        await ctx.reply('Спасибо, опрос окончен')
        return { mood, comment, photo }
    } finally {
        ctx.session.isInDialog = false
    }
}

function setupCreateDialog(bot) {
    bot.use(createConversation(createDialog))

    bot.callbackQuery('create-post', async (ctx) => {
        await ctx.conversation.enter('createDialog')
    })
}

module.exports = { setupCreateDialog }
