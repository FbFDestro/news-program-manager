const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.USER,
    host: '127.0.0.1',
    database: 'jornal',
    password: process.env.PASS,
    port: 5432,
})

module.exports = pool;