const { mainKeyboards, createNoteKeyboards } = require('../keyboards')

const { createConversation } = require('@grammyjs/conversations')

async function createDialog(conversation, ctx) {
    try {
        const validMood = ['😣', '🙁', '😐', '🙂', '😃']
        let mood
        while (true) {
            await ctx.reply('Как ваше настроение сегодня?', {
                reply_markup: createNoteKeyboards.createChoiseMood(),
            })

            mood = await conversation.form.text()

            if (validMood.includes(mood)) {
                break
            }
            await ctx.reply(
                'Пожалуйста, выберите смайлик из списка, используя клавиатуру.',
                {
                    reply_markup: { remove_keyboard: true },
                },
            )
        }
        await ctx.reply('Напиши заметку дня ', {
            reply_markup: { remove_keyboard: true },
        })
        const comment = await conversation.form.text()

        await ctx.reply('Отправь фото дня')
        const photo = await conversation.form.text()

        await ctx.reply('Спасибо, опрос окончен')
        return { mood, comment, photo }
    } catch (err) {
        console.log(err)
    }
}

module.exports = { createDialog }
