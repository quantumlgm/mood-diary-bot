module.exports = async (bot) => {
    await bot.api.setMyCommands([
        { command: 'start', description: 'Запустить бота' },
        { command: 'menu', description: 'Вызвать главное меню' },
        { command: 'help', description: 'Вызвать меню помощи' },
        { command: 'create', description: 'Перейти к созданию записи' },
        { command: 'history', description: 'Просмотреть историю записей' },
    ])
}
