const { saveReport } = require('./db-operations/request-templates')
const { createNoteKeyboards, mainKeyboards } = require('./modules/keyboards')

async function createDialog(conversation, ctx) {
    try {
        const validMood = ['😣', '🙁', '😐', '🙂', '😃']
        let mood
        while (true) {
            await ctx.reply('Как ваше настроение сегодня?', {
                reply_markup: createNoteKeyboards.choiseMoodKeyboard(),
            })

            mood = await conversation.form.text()

            if (validMood.includes(mood)) {
                break
            }
            await ctx.reply(
                'Пожалуйста, выберите смайлик из списка, используя клавиатуру.',
            )
        }

        async function createChoice(category, keyboard) {
            const selected = []

            while (true) {
                await ctx.reply(
                    `📝 Категория: ${category}\n\nНажмите Готово, когда завершите выбор.\nДля отмены последнего выбора нажмите Отменить выбор.\n\n🔹 Выбрано: ${selected.join(', ') || 'пока ничего не выбрано'}`,
                    {
                        reply_markup: keyboard,
                    },
                )

                const choice = await conversation.waitFor('message:text')

                if (choice.message.text === 'Готово ➡️') {
                    if (selected.length === 0) {
                        await ctx.reply(
                            'Пожалуйста, выберите хотя бы один пункт, прежде чем продолжить',
                        )
                        continue
                    }
                    return selected
                }
                if (choice.message.text === 'Отменить выбор 🗑️') {
                    if (selected.length === 0) {
                        await ctx.reply('⏳ Выберите хотя бы один пункт')
                        continue
                    } else {
                        const removed = selected.pop()
                        await ctx.reply(`🗑️ Пункт "${removed}" удалён.`)
                        continue
                    }
                }
                if (selected.includes(choice.message.text)) {
                    await ctx.reply('Этот пункт уже выбран!')
                    continue
                }

                selected.push(choice.message.text)
            }
        }

        const restActivities = await createChoice(
            'Отдых и забота о себе',
            createNoteKeyboards.activitiesRestKeyboard(),
        )
        const workActivities = await createChoice(
            'Работа и учеба',
            createNoteKeyboards.activitiesWorkKeyboard(),
        )
        const societyActivities = await createChoice(
            'Общение и социум',
            createNoteKeyboards.activitiesSocietyKeyboard(),
        )

        const loveEmotion = await createChoice(
            'Эмоции любви',
            createNoteKeyboards.emotionLoveKeyboard(),
        )
        const happyEmotion = await createChoice(
            'Эмоции радости',
            createNoteKeyboards.emotionHappyKeyboard(),
        )
        const angerEmotion = await createChoice(
            'Эмоции злости',
            createNoteKeyboards.emotionAngerKeyboard(),
        )

        await ctx.reply(
            'Отправь комментарий дня - можешь писать что захочешь!',
            {
                reply_markup: { remove_keyboard: true },
            },
        )
        const comment = await conversation.form.text()

        const saveMessage = await ctx.reply(
            'Заметка готова. Хотите сохранить?',
            {
                reply_markup: createNoteKeyboards.choiceSaveKeyboard(),
            },
        )

        const { callbackQuery } = await conversation.waitFor(
            'callback_query:data',
        )
        await ctx.api.editMessageReplyMarkup(
            ctx.chat.id,
            saveMessage.message_id,
            { reply_markup: null },
        )

        if (callbackQuery.data === 'confirm_save') {
            const data = {
                mood,
                restActivities,
                workActivities,
                societyActivities,
                loveEmotion,
                happyEmotion,
                angerEmotion,
                comment,
            }
            await saveReport(ctx, data)
            await ctx.api.editMessageText(
                ctx.chat.id,
                saveMessage.message_id,
                `📘 Готово! Запись сделана.

📊 Ваш итоговый отчет за сегодня: 
Ваше настроение: ${mood}

Ваши активности:
-Отдых: ${restActivities.join(', ')}
-Работа: ${workActivities.join(', ')}
-Социум: ${societyActivities.join(', ')}

Ваши эмоции: 
-Любовь: ${loveEmotion.join(', ')}
-Радость: ${happyEmotion.join(', ')}
-Злость: ${angerEmotion.join(', ')} 

Комментарий дня: ${comment}`,
                {
                    reply_markup: mainKeyboards.backMenuKeyboard(),
                },
            )
        } else if (callbackQuery.data === 'cancel_save') {
            await ctx.api.editMessageText(
                ctx.chat.id,
                saveMessage.message_id,
                'Заметка отменена',
                {
                    reply_markup: mainKeyboards.backMenuKeyboard(),
                },
            )
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = { createDialog }
