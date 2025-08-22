const pool = require('../../db.js')

async function createReportsTable() {
    const create = `CREATE TABLE reports  (
	id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
	mood JSONB NOT NULL,
	rest JSONB NOT NULL,
	job JSONB NOT NULL,
	sociality JSONB NOT NULL,
	love JSONB NOT NULL,
	happy JSONB NOT NULL,
	angry JSONB NOT NULL,
	comment TEXT NOT NULL,
	created_at TIMESTAMP DEFAULT NOW()
)`
    try {
        await pool.query(create)
        console.log('Таблица reports создана успешно')
    } catch (err) {
        console.log('ОШИБКА ПРИ СОЗДАНИИ ТАБЛИЦЫ:', err)
    }
}

createReportsTable()
