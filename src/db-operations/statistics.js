const pool = require('../../db.js')

// Получить все записи пользователя
async function getAllReports(userId, limit = null) {
    let query = `
        SELECT * FROM reports
        WHERE user_id = $1
        ORDER BY created_at DESC
    `
    const params = [userId]
    
    if (limit) {
        query += ` LIMIT $2`
        params.push(limit)
    }
    
    const res = await pool.query(query, params)
    return res.rows
}

// Получить записи за период
async function getReportsByPeriod(userId, days = 30) {
    const res = await pool.query(
        `
        SELECT * FROM reports
        WHERE user_id = $1 
        AND created_at >= NOW() - INTERVAL '${days} days'
        ORDER BY created_at ASC
        `,
        [userId],
    )
    return res.rows
}

// Статистика настроения
function getMoodStatistics(reports) {
    if (reports.length === 0) {
        return null
    }

    const moodValues = {
        '😣': 1,
        '🙁': 2,
        '😐': 3,
        '🙂': 4,
        '😃': 5,
    }

    const moods = reports.map((r) => {
        const mood = typeof r.mood === 'string' ? JSON.parse(r.mood) : r.mood
        return moodValues[mood] || 3
    })

    const avgMood = moods.reduce((a, b) => a + b, 0) / moods.length
    const moodCounts = {}
    
    reports.forEach((r) => {
        const mood = typeof r.mood === 'string' ? JSON.parse(r.mood) : r.mood
        moodCounts[mood] = (moodCounts[mood] || 0) + 1
    })

    const mostFrequentMood = Object.keys(moodCounts).reduce((a, b) =>
        moodCounts[a] > moodCounts[b] ? a : b,
    )

    // Определение тренда
    const recentMoods = moods.slice(0, Math.min(7, moods.length))
    const olderMoods = moods.slice(7, Math.min(14, moods.length))
    
    let trend = 'стабильное'
    if (recentMoods.length > 0 && olderMoods.length > 0) {
        const recentAvg = recentMoods.reduce((a, b) => a + b, 0) / recentMoods.length
        const olderAvg = olderMoods.reduce((a, b) => a + b, 0) / olderMoods.length
        if (recentAvg > olderAvg + 0.3) trend = 'улучшается 📈'
        else if (recentAvg < olderAvg - 0.3) trend = 'ухудшается 📉'
    }

    return {
        average: avgMood.toFixed(2),
        mostFrequent: mostFrequentMood,
        trend,
        total: reports.length,
    }
}

// Статистика активностей
function getActivitiesStatistics(reports) {
    if (reports.length === 0) {
        return null
    }

    const activityCounts = {
        rest: {},
        work: {},
        social: {},
    }

    reports.forEach((report) => {
        // Отдых
        const rest = typeof report.rest === 'string' ? JSON.parse(report.rest) : report.rest
        if (Array.isArray(rest)) {
            rest.forEach((activity) => {
                activityCounts.rest[activity] = (activityCounts.rest[activity] || 0) + 1
            })
        }

        // Работа
        const work = typeof report.job === 'string' ? JSON.parse(report.job) : report.job
        if (Array.isArray(work)) {
            work.forEach((activity) => {
                activityCounts.work[activity] = (activityCounts.work[activity] || 0) + 1
            })
        }

        // Социум
        const social = typeof report.sociality === 'string' ? JSON.parse(report.sociality) : report.sociality
        if (Array.isArray(social)) {
            social.forEach((activity) => {
                activityCounts.social[activity] = (activityCounts.social[activity] || 0) + 1
            })
        }
    })

    // Топ 3 для каждой категории
    const getTop = (obj, count = 3) => {
        return Object.entries(obj)
            .sort((a, b) => b[1] - a[1])
            .slice(0, count)
            .map(([name, count]) => ({ name, count }))
    }

    return {
        rest: getTop(activityCounts.rest),
        work: getTop(activityCounts.work),
        social: getTop(activityCounts.social),
    }
}

// Статистика эмоций
function getEmotionsStatistics(reports) {
    if (reports.length === 0) {
        return null
    }

    const emotionCounts = {
        love: {},
        happy: {},
        angry: {},
    }

    reports.forEach((report) => {
        // Любовь
        const love = typeof report.love === 'string' ? JSON.parse(report.love) : report.love
        if (Array.isArray(love)) {
            love.forEach((emotion) => {
                emotionCounts.love[emotion] = (emotionCounts.love[emotion] || 0) + 1
            })
        }

        // Радость
        const happy = typeof report.happy === 'string' ? JSON.parse(report.happy) : report.happy
        if (Array.isArray(happy)) {
            happy.forEach((emotion) => {
                emotionCounts.happy[emotion] = (emotionCounts.happy[emotion] || 0) + 1
            })
        }

        // Злость
        const angry = typeof report.angry === 'string' ? JSON.parse(report.angry) : report.angry
        if (Array.isArray(angry)) {
            angry.forEach((emotion) => {
                emotionCounts.angry[emotion] = (emotionCounts.angry[emotion] || 0) + 1
            })
        }
    })

    const getTop = (obj, count = 3) => {
        return Object.entries(obj)
            .sort((a, b) => b[1] - a[1])
            .slice(0, count)
            .map(([name, count]) => ({ name, count }))
    }

    return {
        love: getTop(emotionCounts.love),
        happy: getTop(emotionCounts.happy),
        angry: getTop(emotionCounts.angry),
    }
}

// Анализ корреляций
function analyzeCorrelations(reports) {
    if (reports.length < 5) {
        return null
    }

    const moodValues = {
        '😣': 1,
        '🙁': 2,
        '😐': 3,
        '🙂': 4,
        '😃': 5,
    }

    const correlations = {
        activities: {},
        emotions: {},
    }

    reports.forEach((report) => {
        const mood = typeof report.mood === 'string' ? JSON.parse(report.mood) : report.mood
        const moodValue = moodValues[mood] || 3

        // Анализ активностей
        const rest = typeof report.rest === 'string' ? JSON.parse(report.rest) : report.rest
        const work = typeof report.job === 'string' ? JSON.parse(report.job) : report.job
        const social = typeof report.sociality === 'string' ? JSON.parse(report.sociality) : report.sociality

        const allActivities = [
            ...(Array.isArray(rest) ? rest : []),
            ...(Array.isArray(work) ? work : []),
            ...(Array.isArray(social) ? social : []),
        ]

        allActivities.forEach((activity) => {
            if (!correlations.activities[activity]) {
                correlations.activities[activity] = { sum: 0, count: 0 }
            }
            correlations.activities[activity].sum += moodValue
            correlations.activities[activity].count += 1
        })

        // Анализ эмоций
        const love = typeof report.love === 'string' ? JSON.parse(report.love) : report.love
        const happy = typeof report.happy === 'string' ? JSON.parse(report.happy) : report.happy
        const angry = typeof report.angry === 'string' ? JSON.parse(report.angry) : report.angry

        const allEmotions = [
            ...(Array.isArray(love) ? love : []),
            ...(Array.isArray(happy) ? happy : []),
            ...(Array.isArray(angry) ? angry : []),
        ]

        allEmotions.forEach((emotion) => {
            if (!correlations.emotions[emotion]) {
                correlations.emotions[emotion] = { sum: 0, count: 0 }
            }
            correlations.emotions[emotion].sum += moodValue
            correlations.emotions[emotion].count += 1
        })
    })

    // Вычисление средних
    const getTopPositive = (obj, count = 3) => {
        return Object.entries(obj)
            .filter(([_, data]) => data.count >= 2) // Минимум 2 упоминания
            .map(([name, data]) => ({
                name,
                avgMood: (data.sum / data.count).toFixed(2),
                count: data.count,
            }))
            .sort((a, b) => parseFloat(b.avgMood) - parseFloat(a.avgMood))
            .slice(0, count)
    }

    return {
        activities: getTopPositive(correlations.activities),
        emotions: getTopPositive(correlations.emotions),
    }
}

// Анализ по дням недели
function analyzeByWeekday(reports) {
    if (reports.length === 0) {
        return null
    }

    const moodValues = {
        '😣': 1,
        '🙁': 2,
        '😐': 3,
        '🙂': 4,
        '😃': 5,
    }

    const weekdayStats = {
        0: { name: 'Воскресенье', moods: [] },
        1: { name: 'Понедельник', moods: [] },
        2: { name: 'Вторник', moods: [] },
        3: { name: 'Среда', moods: [] },
        4: { name: 'Четверг', moods: [] },
        5: { name: 'Пятница', moods: [] },
        6: { name: 'Суббота', moods: [] },
    }

    reports.forEach((report) => {
        const date = new Date(report.created_at)
        const weekday = date.getDay()
        const mood = typeof report.mood === 'string' ? JSON.parse(report.mood) : report.mood
        const moodValue = moodValues[mood] || 3
        weekdayStats[weekday].moods.push(moodValue)
    })

    const result = Object.entries(weekdayStats)
        .map(([day, data]) => {
            if (data.moods.length === 0) return null
            const avg = data.moods.reduce((a, b) => a + b, 0) / data.moods.length
            return {
                day: parseInt(day),
                name: data.name,
                avgMood: avg.toFixed(2),
                count: data.moods.length,
            }
        })
        .filter((item) => item !== null)
        .sort((a, b) => parseFloat(b.avgMood) - parseFloat(a.avgMood))

    return result
}

// Получить полную статистику
async function getFullStatistics(userId, days = 30) {
    const reports = await getReportsByPeriod(userId, days)
    
    if (reports.length === 0) {
        return {
            hasData: false,
            totalRecords: 0,
        }
    }

    return {
        hasData: true,
        totalRecords: reports.length,
        period: days,
        mood: getMoodStatistics(reports),
        activities: getActivitiesStatistics(reports),
        emotions: getEmotionsStatistics(reports),
        correlations: analyzeCorrelations(reports),
        weekdays: analyzeByWeekday(reports),
    }
}

module.exports = {
    getAllReports,
    getReportsByPeriod,
    getMoodStatistics,
    getActivitiesStatistics,
    getEmotionsStatistics,
    analyzeCorrelations,
    analyzeByWeekday,
    getFullStatistics,
}
