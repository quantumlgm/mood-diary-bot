const { createHelpKeyboard } = require('./keyboards')
const { helpText } = require('./text-templates')

sendHelp = async (ctx) => {
    await ctx.reply(helpText.helpMenuText, {
        reply_markup: createHelpKeyboard(),
    })
}

getTodayDate = () => {
    const now = new Date()

    const day = now.getDay()
    const month = now.getMonth()

    const dayFormatted = day < 10 ? '0' + day : day
    const monthFormatted = month < 10 ? '0' + month : month

    return `${dayFormatted}.${monthFormatted}`
}

getTodayDate()

module.exports = {
    sendHelp,
    getTodayDate,
}
