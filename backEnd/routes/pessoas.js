const express = require('express');
const router = express.Router();
const conexao = require('../conexao')

router.get('/', (request, response) => {
    conexao.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
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