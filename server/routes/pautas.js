const express = require('express');
const router = express.Router();
const conexao = require('../conexao');

router.use(express.json()) // for parsing application/json
router.use(express.urlencoded({
    extended: true
}));

router.post('/', async (request, response) => {
    console.log(request.body.titulo, request.body.pesquisador, request.body.resumo);
    try {
        const sql = {
            text: 'INSERT INTO PAUTA ("titulo", "pesquisador", "resumo") VALUES ($1, $2, $3)',
            values: [request.body.titulo, request.body.pesquisador, request.body.resumo]
        }

        console.log(sql);

        await conexao.query(sql); // insere pauta

        response.status(200).send("Dados inseridos com sucesso");
    } catch (err) {
        response.status(400).send("Falha ao inserir dados!\n" + err.message);
        console.log('Database ' + err);
        // console.log(Object.getOwnPropertyNames(err));
    }
});

router.post('/link', async (request, response) => {
    console.log(request.body.pauta, request.body.link);
    try {
        const sql = {
            text: 'INSERT INTO LINK ("pauta", "link") VALUES ($1, $2)',
            values: [request.body.titulo, request.body.pesquisador, request.body.resumo]
        }

        console.log(sql);

        await conexao.query(sql); // insere pauta

        response.status(200).send("Dados inseridos com sucesso");
    } catch (err) {
        response.status(400).send("Falha ao inserir dados!\n" + err.message);
        console.log('Database ' + err);
        // console.log(Object.getOwnPropertyNames(err));
    }

});

router.get('/', async (request, response) => { // usando await async
    try {
        const sql = `
        select * from  PAUTA P 
            left join LINK L 
                ON L.pauta = P.titulo;
        `;

        console.log(sql);

        const results = await conexao.query(sql);
        response.status(200).json(results.rows[0].count);
    } catch (err) {
        response.status(404).send("Not found");
        console.log('Database ' + err);
    }
});


router.get('/pautas', async (request, response) => { // usando await async
    try {
        const sql = `
        select * from  PAUTA P 
            left join LINK L
                ON L.pauta = P.titulo
            where titulo = ${response.pauta};
        `;

        console.log(sql);

        const results = await conexao.query(sql);
        response.status(200).json(results.rows[0].count);
    } catch (err) {
        response.status(404).send("Not found");
        console.log('Database ' + err);
    }
});

router.get('/pautas/pesquisador', async (request, response) => { // usando await async
    try {
        const sql = `
        select * from  PAUTA P 
            left join LINK L
                ON L.pauta = P.titulo
            where P.titulo = ${response.pauta} and P.pesquisador = ${response.pesquisador};
        `;

        console.log(sql);

        const results = await conexao.query(sql);
        response.status(200).json(results.rows[0].count);
    } catch (err) {
        response.status(404).send("Not found");
        console.log('Database ' + err);
    }
});

module.exports = router;