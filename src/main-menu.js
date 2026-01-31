const { Menu } = require('@grammyjs/menu')
const { createConversation } = require('@grammyjs/conversations')

const {
    mainText,
    createPostText,
    helpText,
    checkNoteHistory,
    statisticsText,
} = require('./modules/text-templates')
const { createDialog } = require('./create-note')
const { getReports } = require('./db-operations/request-templates')
const { checkNoteKeyboard, statisticsKeyboards } = require('./modules/keyboards')

const mainMenu = new Menu('main-menu')
const createNoteMenu = new Menu('create-note')
const historyNotesMenu = new Menu('history-notes')
const statisticsMenu = new Menu('statistics-menu')
const helpMenu = new Menu('help-menu')
const commandList = new Menu('command-list')

async function setupMainMenu(bot) {
    bot.use(createConversation(createDialog))

    mainMenu
        .text('📜 История записей', async (ctx) => {
            await ctx.editMessageText(checkNoteHistory.checkTextNote, {
                reply_markup: historyNotesMenu,
            })
        })
        .row()
        .submenu('✍️ Создать запись', 'create-note', async (ctx) => {
            await ctx.editMessageText(createPostText.initialTextNote)
        })
        .row()
        .submenu('📊 Статистика и анализ', 'statistics-menu', async (ctx) => {
            await ctx.editMessageText(statisticsText.statisticsMenuText)
        })
        .row()
        .submenu('📚 Помощь', 'help-menu', async (ctx) => {
            await ctx.editMessageText(helpText.helpMenuText)
        })

    createNoteMenu
        .text('📝 Создать новую запись', async (ctx) => {
            await ctx.conversation.enter('createDialog')
        })
        .row()
        .back('🏠 Назад в меню', async (ctx) => {
            await ctx.editMessageText(mainText.menuText)
        })

    historyNotesMenu
        .text('🔎 Просмотреть записи', async (ctx) => {
            const reports = await getReports(ctx.from.id)
            await ctx.editMessageText('Последние записи:', {
                reply_markup: checkNoteKeyboard.checkHistoryKeyboard(reports),
            })
        })
        .row()
        .back('🏠 Назад в меню', async (ctx) => {
            await ctx.editMessageText(mainText.menuText)
        })

    helpMenu
        .url('💬 Написать в поддержку', 'https://t.me/quantumlgm')
        .row()
        .submenu('📄 Список команд', 'command-list', async (ctx) => {
            await ctx.editMessageText(helpText.commandsMenuList)
        })
        .row()
        .back('🏠 Назад в меню', async (ctx) => {
            await ctx.editMessageText(mainText.menuText)
        })

    commandList.back('🔙 Назад в помощь', async (ctx) => {
        await ctx.editMessageText(helpText.helpMenuText)
    })

    statisticsMenu
        .text('📈 Общая статистика', async (ctx) => {
            const { getFullStatistics } = require('./db-operations/statistics')
            const stats = await getFullStatistics(ctx.from.id, 30)
            const text = statisticsText.formatStatistics(stats)
            await ctx.editMessageText(text, {
                reply_markup: statisticsKeyboards.statisticsBackKeyboard(),
            })
        })
        .row()
        .text('🔍 Глубокий анализ', async (ctx) => {
            const { getFullStatistics } = require('./db-operations/statistics')
            const stats = await getFullStatistics(ctx.from.id, 30)
            const text = statisticsText.formatDeepAnalysis(stats)
            await ctx.editMessageText(text, {
                reply_markup: statisticsKeyboards.statisticsBackKeyboard(),
            })
        })
        .row()
        .text('📅 По дням недели', async (ctx) => {
            const { getFullStatistics } = require('./db-operations/statistics')
            const stats = await getFullStatistics(ctx.from.id, 90)
            const text = statisticsText.formatWeekdayAnalysis(stats)
            await ctx.editMessageText(text, {
                reply_markup: statisticsKeyboards.statisticsBackKeyboard(),
            })
        })
        .row()
        .text('💡 Рекомендации', async (ctx) => {
            const { getFullStatistics } = require('./db-operations/statistics')
            const stats = await getFullStatistics(ctx.from.id, 30)
            const text = statisticsText.formatRecommendations(stats)
            await ctx.editMessageText(text, {
                reply_markup: statisticsKeyboards.statisticsBackKeyboard(),
            })
        })
        .row()
        .back('🏠 Назад в меню', async (ctx) => {
            await ctx.editMessageText(mainText.menuText)
        })

    mainMenu.register(createNoteMenu)
    mainMenu.register(historyNotesMenu)
    mainMenu.register(statisticsMenu)
    mainMenu.register(helpMenu)
    helpMenu.register(commandList)

    bot.use(mainMenu)
}

module.exports = {
    setupMainMenu,
    mainMenu,
    helpMenu,
    createNoteMenu,
    historyNotesMenu,
    statisticsMenu,
    commandList,
}
