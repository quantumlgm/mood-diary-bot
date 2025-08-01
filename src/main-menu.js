const { Menu } = require('@grammyjs/menu')
const { createConversation } = require('@grammyjs/conversations')

const { mainText, createPostText, helpText } = require('./modules/text-templates')
const { createDialog } = require('./modules/create-notes/create-note')

const mainMenu = new Menu('main-menu')
async function setupMainMenu(bot) {
    bot.use(createConversation(createDialog))

    mainMenu
        .submenu('История записей')
        .row()
        .submenu('Создать запись', 'create-note', async (ctx) => {
            await ctx.editMessageText(createPostText.initialTextNote)
        })
        .row()
        .submenu('Помощь', 'help-menu', async (ctx) => {
            await ctx.editMessageText(helpText.helpMenuText)
        })

    const createNoteMenu = new Menu('create-note')
        .back('Назад в меню', async (ctx) => {
            await ctx.editMessageText(mainText.menuText)
        })
        .row()
        .text('Создать новую запись', async (ctx) => {
            await ctx.conversation.enter('createDialog')
        })

    const helpMenu = new Menu('help-menu')
        .url('Написать в поддержку', 'https://t.me/thesay11')
        .row()
        .submenu('Список комманд', 'command-list', async (ctx) => {
            await ctx.editMessageText(helpText.commandsMenuList)
        })
        .row()
        .back('Назад в меню', async (ctx) => {
            await ctx.editMessageText(mainText.menuText)
        })

    const commandList = new Menu('command-list').back(
        'Назад в помощь',
        async (ctx) => {
            await ctx.editMessageText(helpText.helpMenuText)
        },
    )

    mainMenu.register(createNoteMenu)
    mainMenu.register(helpMenu)
    helpMenu.register(commandList)

    bot.use(mainMenu)

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
}

function getMainMenu() {
    return mainMenu
}

module.exports = {
    setupMainMenu,
    getMainMenu
}
