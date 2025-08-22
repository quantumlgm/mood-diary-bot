const pool = require('../../db.js')

async function saveReport(ctx, data) {
    const res = await pool.query(
        `INSERT INTO reports(user_id, mood, rest, job, sociality, love, happy, angry, comment) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [
            ctx.from.id,
            JSON.stringify(data.mood),
            JSON.stringify(data.restActivities),
            JSON.stringify(data.workActivities),
            JSON.stringify(data.societyActivities),
            JSON.stringify(data.loveEmotion),
            JSON.stringify(data.happyEmotion),
            JSON.stringify(data.angerEmotion),
            data.comment,
        ],
    )
    return res.rows[0]
}

async function getReports(userId) {
    const res = await pool.query(
        `
        SELECT * FROM reports
        WHERE user_id = $1
        ORDER BY created_at DESC
        LIMIT 5
        `,
        [userId],
    )
    return res.rows
}

async function getReportById(reportId) {
    const res = await pool.query(`SELECT * FROM reports WHERE id = $1`, [
        reportId,
    ])
    return res.rows[0]
}

async function deleteReport(reportId) {
    const res = await pool.query(
        `DELETE FROM reports WHERE id = $1 RETURNING *`,
        [reportId],
    )
    return res.rows[0]
}

module.exports = { saveReport, getReports, getReportById, deleteReport }
