const pool = require('../../../db.js')

async function createMessagesTable() {
    const create = `CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
    )`

    try {
        await pool.query(create)
        console.log('Таблица messages создана успешно')
    } catch (err) {
        console.log('ОШИБКА ПРИ СОЗДАНИИ ТАБЛИЦЫ:', err)
    }
}

createMessagesTable()
