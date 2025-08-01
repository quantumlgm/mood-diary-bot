const pool = require('../../db.js')

async function saveMessage(text) {
    const res = await pool.query(
        'INSERT INTO messages(text) VALUES($1) RETURNING *',
        [text],
    )
    return res.rows[0]
}

module.exports = { saveMessage }
