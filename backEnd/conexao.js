const Pool = require('pg').Pool
const pool = new Pool({
    user: 'fbfdestro',
    host: '127.0.0.1',
    database: 'jornal',
    password: '1234*',
    port: 5432,
})

module.exports = pool;