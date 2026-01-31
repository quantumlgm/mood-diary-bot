const { InlineKeyboard, Keyboard } = require('grammy')

// Клавиатуры: Основные
const menuKeyboard = () => {
    return new InlineKeyboard().text('Главное меню', 'menu')
}

const backMenuKeyboard = () => {
    return new InlineKeyboard().text('Назад в меню', 'back-menu')
}

//Клавиатуры: Активности
const choiseMoodKeyboard = () => {
    return new Keyboard()
        .text('😣')
        .text('🙁')
        .text('😐')
        .row()
        .text('🙂')
        .text('😃')
        .oneTime()
        .resized()
}

const activitiesRestKeyboard = () => {
    return new Keyboard()
        .text('Отдых')
        .row()
        .text('Сон')
        .text('Чтение книги')
        .text('Прогулка')
        .row()
        .text('Здоровье')
        .text('Душ')
        .row()
        .text('Готово ➡️')
        .row()
        .text('Отменить выбор 🗑️')
        .resized()
}

const activitiesWorkKeyboard = () => {
    return new Keyboard()
        .text('Работа')
        .row()
        .text('Домашние дела')
        .text('Покупки')
        .row()
        .text('Обучение')
        .text('Саморазвитие')
        .row()
        .text('Готово ➡️')
        .row()
        .text('Отменить выбор 🗑️')
        .resized()
}

const activitiesSocietyKeyboard = () => {
    return new Keyboard()
        .text('Общение')
        .row()
        .text('Любовь')
        .text('Друзья')
        .row()
        .text('Мероприятия')
        .text('Социальные сети')
        .row()
        .text('Готово ➡️')
        .row()
        .text('Отменить выбор 🗑️')
        .resized()
}

//Клавиатуры: Эмоции
const emotionLoveKeyboard = () => {
    return new Keyboard()
        .text('Нежность')
        .row()
        .text('Блаженство')
        .text('Благодарность')
        .row()
        .text('Влюбленность')
        .text('Очарованность')
        .row()
        .text('Готово ➡️')
        .row()
        .text('Отменить выбор 🗑️')
        .resized()
}
const emotionHappyKeyboard = () => {
    return new Keyboard()
        .text('Радость')
        .row()
        .text('Восторг')
        .text('Надежда')
        .row()
        .text('Любопытство')
        .text('Счастье')
        .row()
        .text('Готово ➡️')
        .row()
        .text('Отменить выбор 🗑️')
        .resized()
}
const emotionAngerKeyboard = () => {
    return new Keyboard()
        .text('Грусть')
        .row()
        .text('Тревога')
        .text('Злость')
        .row()
        .text('Срыв')
        .text('Ненависть')
        .text('Разочарование')
        .row()
        .text('Готово ➡️')
        .row()
        .text('Отменить выбор 🗑️')
        .resized()
}

const choiceSaveKeyboard = () => {
    return new InlineKeyboard()
        .text('✅ Подтвердить создание', 'confirm_save')
        .row()
        .text('❌ Отменить', 'cancel_save')
}

//Клавиатуры: Просмотр записей
function checkHistoryKeyboard(reports) {
    const keyboard = new InlineKeyboard()

    reports.forEach((report) => {
        const date = new Date(report.created_at)
        keyboard
            .text(`📅 ${date.toLocaleDateString()}`, `view_${report.id}`)
            .row()
    })

    keyboard.text('🔙 Назад к меню записей', 'back-to-records-menu')

    return keyboard
}

function viewReportKeyboard(reportId) {
    return new InlineKeyboard()
        .text('🗑️ Удалить', `confirm_delete_${reportId}`)
        .row()
        .text('🔙 Назад к списку', 'back-to-history')
        .text('🏠 В меню', 'back-menu')
}

function confirmDeleteKeyboard(reportId) {
    return new InlineKeyboard()
        .text('✅ Да, удалить', `delete_${reportId}`)
        .text('❌ Нет, отмена', `view_${reportId}`)
}

// Клавиатуры: Помощь
const listMenuCommandsKeyboard = () => {
    return new InlineKeyboard().text(
        'Список доступных команд',
        'list-menu-commands',
    )
}

// Клавиатуры: Статистика
const statisticsMenuKeyboard = () => {
    return new InlineKeyboard()
        .text('📈 Общая статистика', 'stats-general')
        .row()
        .text('🔍 Глубокий анализ', 'stats-deep')
        .row()
        .text('📅 По дням недели', 'stats-weekdays')
        .row()
        .text('💡 Рекомендации', 'stats-recommendations')
        .row()
        .text('🏠 Назад в меню', 'back-menu')
}

const statisticsBackKeyboard = () => {
    return new InlineKeyboard()
        .text('🔙 Назад к статистике', 'back-to-statistics')
        .text('🏠 В меню', 'back-menu')
}

module.exports = {
    mainKeyboards: {
        backMenuKeyboard,
        menuKeyboard,
    },
    commandsKeyboards: {
        listMenuCommandsKeyboard,
    },
    createNoteKeyboards: {
        choiseMoodKeyboard,
        activitiesRestKeyboard,
        activitiesWorkKeyboard,
        activitiesSocietyKeyboard,

        emotionLoveKeyboard,
        emotionHappyKeyboard,
        emotionAngerKeyboard,

        choiceSaveKeyboard,
    },
    checkNoteKeyboard: {
        checkHistoryKeyboard,
        viewReportKeyboard,
        confirmDeleteKeyboard,
    },
    statisticsKeyboards: {
        statisticsMenuKeyboard,
        statisticsBackKeyboard,
    },
}
