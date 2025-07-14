module.exports = async (bot) => {
    await bot.api.setMyCommands([
        { command: 'start', description: 'Запустить бота' },
        { command: 'help', description: 'Вызвать помощь' },
    ])
}
