const { InlineKeyboard, Keyboard } = require('grammy')

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

module.exports = {
        createMenuKeyboard,
        choiceMenu
}
