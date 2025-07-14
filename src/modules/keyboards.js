const { InlineKeyboard } = require('grammy')

createHelpKeyboard = () => {
    return new InlineKeyboard().text('Написать в поддержку', 'button-help')
}

module.exports = createHelpKeyboard
