const express = require('express');
const router = express.Router();
const conexao = require('../conexao');

router.use(express.json()) // for parsing application/json
router.use(express.urlencoded({
    extended: true
}));

/*
router.get('/', (request, response) => { // usando callback
    conexao.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
});
*/

router.get('/', async (request, response) => { // usando await async
    try {
        const sql = `
        select pes.cpf, pes.nome, pes.tel,
            pesq.cpf as pesquisador,
            jor.cpf as jornalista,
            prod.cpf as produtor,
            ed.cpf as editor
        from pessoa pes
        left join pesquisador pesq
        on pes.cpf = pesq.cpf
        left join jornalista jor
        on pes.cpf = jor.cpf
        left join PRODUTOR prod
        on pes.cpf = prod.cpf
        left join editor ed
        on pes.cpf = ed.cpf;`;

        const results = await conexao.query(sql);
        response.status(200).json(results.rows);
    } catch (err) {
        response.status(404).send("Not found");
        console.log('Database ' + err);
    }
});

router.post('/', async (request, response) => {
    console.log(request.body.cpf, request.body.nome, request.body.telefone);
    try {
        const sql = {
            text: 'INSERT INTO pessoa ("cpf", "nome", "tel") VALUES ($1, $2, $3)',
            values: [request.body.cpf, request.body.nome, request.body.telefone]
        }
        await conexao.query(sql);
        response.status(200).send("Dados inseridos com sucesso");
    } catch (err) {
        response.status(400).send("Falha ao inserir dados!\n" + err.message);
        console.log('Database ' + err);
        // console.log(Object.getOwnPropertyNames(err));
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