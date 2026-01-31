// Основные
const menuText = `💻 Вы в главном меню!

Выберите один из вариантов:

📜 История записей — просмотреть и управлять заметками
✍️ Создать запись — добавить новую запись о дне
📊 Статистика и анализ — аналитика и рекомендации
📚 Помощь — справка и поддержка `

const startText = `🔮 Привет! 

Я бот, который помогает отслеживать настроение. Я буду задавать простые вопросы - просто отвечай с помощью кнопок.

Ваша заметка будет сохранена. В любой момент можно прочитать, изменить, удалить заметку за любой день.

Попробуй! Что бы вызвать главное меню, жми кнопку ниже!`

// Создание записи
const initialTextNote = `📝 Ты выбрал создание новой записи! 

В ходе создания будут задаваться разные интересные вопросы. Все твои ответы сохраняться и будут доступны всегда.

Если ты готов, жми кнопку ниже.`

// Просмотр записи
const checkTextNote = `🔎 Ты выбрал просмотр записей!  

Тут вы можете посмотреть записи которые вы делали раньше, удалить или изменить их.`

// Помощь
const commandsMenuList = `Доступные команды: 

/start - Запустить бота
/menu - Вызвать главное меню
/help - Вызвать меню помощи
/create - Перейти к созданию записи
/history - Посмотреть историю записей
/stats - Открыть статистику и анализ `

const helpMenuText = ` 💬 Что то случилось? Напишите создателю бота! `

// Ошибки
const noText = `Такой команды нет 😕

Пожалуйста, воспользуйтесь меню команд или посмотрите список доступных команд!`

// Статистика
const statisticsMenuText = `📊 Меню статистики и анализа

Выберите, что вас интересует:

📈 Общая статистика — полный анализ ваших записей
🔍 Глубокий анализ — корреляции и тренды
📅 Анализ по дням недели — когда вам лучше всего
💡 Рекомендации — советы на основе ваших данных`

const noDataText = `📊 У вас пока нет записей для анализа

Создайте несколько записей, чтобы увидеть статистику!`

// Функции для форматирования статистики
function formatStatistics(stats) {
    if (!stats.hasData) {
        return noDataText
    }

    let text = `📊 ОБЩАЯ СТАТИСТИКА (за последние ${stats.period} дней)\n\n`
    text += `📝 Всего записей: ${stats.totalRecords}\n\n`

    // Статистика настроения
    if (stats.mood) {
        text += `😊 НАСТРОЕНИЕ:\n`
        text += `   Среднее: ${getMoodEmoji(stats.mood.average)} (${stats.mood.average}/5)\n`
        text += `   Чаще всего: ${stats.mood.mostFrequent}\n`
        text += `   Тренд: ${stats.mood.trend}\n\n`
    }

    // Статистика активностей
    if (stats.activities) {
        text += `🏃 АКТИВНОСТИ:\n`
        if (stats.activities.rest.length > 0) {
            text += `   Отдых: ${stats.activities.rest.map(a => `${a.name} (${a.count})`).join(', ')}\n`
        }
        if (stats.activities.work.length > 0) {
            text += `   Работа: ${stats.activities.work.map(a => `${a.name} (${a.count})`).join(', ')}\n`
        }
        if (stats.activities.social.length > 0) {
            text += `   Социум: ${stats.activities.social.map(a => `${a.name} (${a.count})`).join(', ')}\n`
        }
        text += `\n`
    }

    // Статистика эмоций
    if (stats.emotions) {
        text += `💭 ЭМОЦИИ:\n`
        if (stats.emotions.love.length > 0) {
            text += `   Любовь: ${stats.emotions.love.map(e => `${e.name} (${e.count})`).join(', ')}\n`
        }
        if (stats.emotions.happy.length > 0) {
            text += `   Радость: ${stats.emotions.happy.map(e => `${e.name} (${e.count})`).join(', ')}\n`
        }
        if (stats.emotions.angry.length > 0) {
            text += `   Негатив: ${stats.emotions.angry.map(e => `${e.name} (${e.count})`).join(', ')}\n`
        }
    }

    return text
}

function formatDeepAnalysis(stats) {
    if (!stats.hasData) {
        return noDataText
    }

    let text = `🔍 ГЛУБОКИЙ АНАЛИЗ\n\n`

    // Корреляции
    if (stats.correlations) {
        text += `📈 ЧТО УЛУЧШАЕТ ВАШЕ НАСТРОЕНИЕ:\n\n`
        
        if (stats.correlations.activities.length > 0) {
            text += `🏃 Активности:\n`
            stats.correlations.activities.forEach((item, idx) => {
                text += `   ${idx + 1}. ${item.name} — среднее настроение ${getMoodEmoji(item.avgMood)} (${item.avgMood}/5)\n`
            })
            text += `\n`
        }

        if (stats.correlations.emotions.length > 0) {
            text += `💭 Эмоции:\n`
            stats.correlations.emotions.forEach((item, idx) => {
                text += `   ${idx + 1}. ${item.name} — среднее настроение ${getMoodEmoji(item.avgMood)} (${item.avgMood}/5)\n`
            })
        }
    } else {
        text += `Для глубокого анализа нужно минимум 5 записей.\n`
        text += `У вас пока ${stats.totalRecords} записей.`
    }

    return text
}

function formatWeekdayAnalysis(stats) {
    if (!stats.hasData || !stats.weekdays || stats.weekdays.length === 0) {
        return noDataText
    }

    let text = `📅 АНАЛИЗ ПО ДНЯМ НЕДЕЛИ\n\n`
    text += `Лучшие дни для вас (по среднему настроению):\n\n`

    stats.weekdays.forEach((day, idx) => {
        text += `${idx + 1}. ${day.name} — ${getMoodEmoji(day.avgMood)} (${day.avgMood}/5) — ${day.count} записей\n`
    })

    return text
}

function formatRecommendations(stats) {
    if (!stats.hasData) {
        return noDataText
    }

    let text = `💡 РЕКОМЕНДАЦИИ НА ОСНОВЕ ВАШИХ ДАННЫХ\n\n`

    const recommendations = []

    // Рекомендации на основе корреляций
    if (stats.correlations && stats.correlations.activities.length > 0) {
        const topActivity = stats.correlations.activities[0]
        if (parseFloat(topActivity.avgMood) >= 4) {
            recommendations.push(`✨ Чаще занимайтесь "${topActivity.name}" — это улучшает ваше настроение!`)
        }
    }

    // Рекомендации на основе тренда
    if (stats.mood && stats.mood.trend === 'ухудшается 📉') {
        recommendations.push(`⚠️ Ваше настроение ухудшается. Попробуйте больше времени уделять активностям, которые вам нравятся.`)
    } else if (stats.mood && stats.mood.trend === 'улучшается 📈') {
        recommendations.push(`🎉 Отлично! Ваше настроение улучшается. Продолжайте в том же духе!`)
    }

    // Рекомендации на основе дней недели
    if (stats.weekdays && stats.weekdays.length > 0) {
        const bestDay = stats.weekdays[0]
        const worstDay = stats.weekdays[stats.weekdays.length - 1]
        if (parseFloat(bestDay.avgMood) - parseFloat(worstDay.avgMood) > 1) {
            recommendations.push(`📅 В ${bestDay.name} у вас обычно лучшее настроение. Планируйте важные дела на этот день!`)
        }
    }

    // Рекомендации на основе активностей
    if (stats.activities) {
        const hasRest = stats.activities.rest.length > 0
        const hasWork = stats.activities.work.length > 0
        if (!hasRest || stats.activities.rest.length < 2) {
            recommendations.push(`😌 Не забывайте об отдыхе! Добавьте больше разнообразия в свои активности для отдыха.`)
        }
    }

    if (recommendations.length === 0) {
        text += `Продолжайте вести дневник! Чем больше данных, тем точнее будут рекомендации.`
    } else {
        recommendations.forEach((rec, idx) => {
            text += `${idx + 1}. ${rec}\n\n`
        })
    }

    return text
}

function getMoodEmoji(value) {
    const num = parseFloat(value)
    if (num >= 4.5) return '😃'
    if (num >= 3.5) return '🙂'
    if (num >= 2.5) return '😐'
    if (num >= 1.5) return '🙁'
    return '😣'
}

module.exports = {
    mainText: {
        menuText,
        startText,
    },
    helpText: {
        commandsMenuList,
        helpMenuText,
    },
    rest: {
        noText,
    },
    createPostText: {
        initialTextNote,
    },
    checkNoteHistory: {
        checkTextNote,
    },
    statisticsText: {
        statisticsMenuText,
        noDataText,
        formatStatistics,
        formatDeepAnalysis,
        formatWeekdayAnalysis,
        formatRecommendations,
    },
}
