const express = require('express');
const router = express.Router();
const conexao = require('../conexao')

router.get('/', (request, response) => { // usando callback
    conexao.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
});

router.get('/await', async (request, response) => { // usando await async
    try {
        const results = await conexao.query('SELECT * FROM users ORDER BY id ASC');
        response.status(200).json(results.rows);
    } catch (err) {
        console.log('Database ' + err);
    }
});

router.get('/:nome', (request, response) => {
    const query = {
        text: 'Select * from users where firstname = $1',
        values: [request.params.nome]
    }
    conexao.query(query, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
});

module.exports = router;