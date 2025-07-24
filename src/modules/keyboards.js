const { InlineKeyboard, Keyboard } = require('grammy')
const commands = require('./commands')

// Основные клавиатуры
createMenuKeyboard = () => {
    return new InlineKeyboard().text('Главное меню', 'menu')
}

choiceMenu = () => {
    return new InlineKeyboard()
        .text('История записей', 'history-entries')
        .row()
        .text('Создать запись', 'create-post')
        .row()
        .text('Помощь', 'help-menu')
}

backMenuKeyboard = () => {
    return new InlineKeyboard().text('Назад в меню', 'back-menu')
}

// Клавиатуры Создания записи

// Клавиатуры Помощь
createHelpKeyboard = () => {
    return new InlineKeyboard()
        .url('Написать в поддержку', 'https://t.me/thesay11')
        .row()
        .text('Список комманд', 'list-menu-commands')
        .row()
        .text('Назад в меню', 'back-menu')
        .row()
}

listMenuCommands = () => {
    return new InlineKeyboard().text(
        'Список доступных комманд',
        'list-menu-commands',
    )
}

backHelpKeyboard = () => {
    return new InlineKeyboard().text('Назад в Помощь', 'back-help-menu')
}

module.exports = {
    mainKeyboards: {
        choiceMenu,
        backMenuKeyboard,
        createMenuKeyboard,
    },
    helpKeyboards: {
        createHelpKeyboard,
        backHelpKeyboard,
    },
    commandsKeyboards: {
        listMenuCommands,
    },
    // createNoteKeyboards: {

    // },
}
