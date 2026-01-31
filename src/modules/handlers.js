const {
    getReportById,
    getReports,
    deleteReport,
} = require('../db-operations/request-templates')
const { getFullStatistics } = require('../db-operations/statistics')
const { mainMenu, commandList, statisticsMenu } = require('../main-menu')
const { checkNoteKeyboard, commandsKeyboards, statisticsKeyboards } = require('./keyboards')
const {
    mainText,
    rest,
    helpText,
    checkNoteHistory,
    statisticsText,
} = require('./text-templates')
const { historyNotesMenu } = require('../main-menu')

const commandsHandler = (bot) => {
    bot.on('message:text', async (ctx, next) => {
        if (ctx.session?.isInDialog) {
            return next()
        }
        await ctx.reply(rest.noText, {
            reply_markup: commandsKeyboards.listMenuCommandsKeyboard(),
        })
    })
}

const callbackQueryHandler = (bot) => {
    bot.callbackQuery('menu', async (ctx) => {
        await ctx.answerCallbackQuery()
        await ctx.reply(mainText.menuText, {
            reply_markup: mainMenu,
        })
    })
    bot.callbackQuery('list-menu-commands', async (ctx) => {
        await ctx.answerCallbackQuery()
        await ctx.editMessageText(helpText.commandsMenuList, {
            reply_markup: commandList,
        })
    })
    bot.callbackQuery('back-menu', async (ctx) => {
        await ctx.answerCallbackQuery()
        await ctx.editMessageText(mainText.menuText, {
            reply_markup: mainMenu,
        })
    })
    bot.callbackQuery('check-notes', async (ctx) => {
        const reports = await getReports(ctx.from.id)
        await ctx.editMessageText('Последние записи:', {
            reply_markup: checkNoteKeyboard.checkHistoryKeyboard(reports),
        })
        await ctx.answerCallbackQuery()
    })
    bot.callbackQuery('back-to-records-menu', async (ctx) => {
        try {
            await ctx.answerCallbackQuery()
            await ctx.editMessageText(checkNoteHistory.checkTextNote, {
                reply_markup: historyNotesMenu,
            })
        } catch (err) {
            console.error('Ошибка в back-to-records-menu:', err)
            await ctx.answerCallbackQuery('Произошла ошибка')
        }
    })

    bot.callbackQuery(/^view_/, async (ctx) => {
        const reportId = ctx.callbackQuery.data.split('_')[1]
        const report = await getReportById(reportId)

        if (report) {
            await ctx.answerCallbackQuery()
            await ctx.editMessageText(
                `📅 Запись от ${new Date(report.created_at).toLocaleDateString()}\n\n` +
                    `Настроение: ${report.mood}\n` +
                    `Отдых: ${report.rest}\n` +
                    `Работа: ${report.job}\n` +
                    `Социум: ${report.sociality}\n` +
                    `Комментарий: ${report.comment}`,
                {
                    reply_markup:
                        checkNoteKeyboard.viewReportKeyboard(reportId),
                },
            )
        } else {
            await ctx.answerCallbackQuery('Запись не найдена')
        }
    })

    bot.callbackQuery('back-to-history', async (ctx) => {
        await ctx.answerCallbackQuery()
        const reports = await getReports(ctx.from.id)
        await ctx.editMessageText('Последние записи:', {
            reply_markup: checkNoteKeyboard.checkHistoryKeyboard(reports),
        })
    })

    bot.callbackQuery(/^confirm_delete_/, async (ctx) => {
        const reportId = ctx.callbackQuery.data.split('_')[2]
        await ctx.editMessageText(
            'Вы уверены, что хотите удалить эту запись?',
            {
                reply_markup: checkNoteKeyboard.confirmDeleteKeyboard(reportId),
            },
        )
        await ctx.answerCallbackQuery()
    })

    bot.callbackQuery(/^delete_/, async (ctx) => {
        const reportId = ctx.callbackQuery.data.split('_')[1]
        const deleted = await deleteReport(reportId)

        if (deleted) {
            await ctx.answerCallbackQuery('Запись удалена')
            const reports = await getReports(ctx.from.id)
            await ctx.editMessageText('Запись удалена. Последние записи:', {
                reply_markup: checkNoteKeyboard.checkHistoryKeyboard(reports),
            })
        } else {
            await ctx.answerCallbackQuery('Ошибка при удалении')
        }
    })

    // Обработчики статистики
    bot.callbackQuery('stats-general', async (ctx) => {
        await ctx.answerCallbackQuery()
        const stats = await getFullStatistics(ctx.from.id, 30)
        const text = statisticsText.formatStatistics(stats)
        await ctx.editMessageText(text, {
            reply_markup: statisticsKeyboards.statisticsBackKeyboard(),
        })
    })

    bot.callbackQuery('stats-deep', async (ctx) => {
        await ctx.answerCallbackQuery()
        const stats = await getFullStatistics(ctx.from.id, 30)
        const text = statisticsText.formatDeepAnalysis(stats)
        await ctx.editMessageText(text, {
            reply_markup: statisticsKeyboards.statisticsBackKeyboard(),
        })
    })

    bot.callbackQuery('stats-weekdays', async (ctx) => {
        await ctx.answerCallbackQuery()
        const stats = await getFullStatistics(ctx.from.id, 90)
        const text = statisticsText.formatWeekdayAnalysis(stats)
        await ctx.editMessageText(text, {
            reply_markup: statisticsKeyboards.statisticsBackKeyboard(),
        })
    })

    bot.callbackQuery('stats-recommendations', async (ctx) => {
        await ctx.answerCallbackQuery()
        const stats = await getFullStatistics(ctx.from.id, 30)
        const text = statisticsText.formatRecommendations(stats)
        await ctx.editMessageText(text, {
            reply_markup: statisticsKeyboards.statisticsBackKeyboard(),
        })
    })

    bot.callbackQuery('back-to-statistics', async (ctx) => {
        await ctx.answerCallbackQuery()
        await ctx.editMessageText(statisticsText.statisticsMenuText, {
            reply_markup: statisticsMenu,
        })
    })
}

module.exports = {
    commandsHandler,
    callbackQueryHandler,
}
