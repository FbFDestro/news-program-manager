const express = require('express');
const router = express.Router();
const conexao = require('../conexao');

router.use(express.json()) // for parsing application/json
router.use(express.urlencoded({
    extended: true
}));


router.post('/equipamentoUtilizado', async (request, response) => {
    console.log(request.body.materia, request.body.arquivo, request.body.equipamento);
    try {
        const sql = {
            text: 'INSERT INTO EQUIPAMENTOS_UTILIZADOS ("materia", "arquivo", "equipamento") VALUES ($1, $2, $s3)',
            values: [request.body.materia, request.body.arquivo, request.body.equipamento]
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


router.post('/', async (request, response) => {
    console.log(request.body.tipo, request.body.ano, request.body.marca, request.body.bloco, request.body.andar, request.body.numero);
    try {
        const sql = {
            text: 'INSERT INTO EQUIPAMENTO ("tipo", "ano", "marca", "bloco", "andar", "numero") VALUES ($1, $2, $s3, $s4, $s5, $s6)',
            values: [request.body.tipo, request.body.ano, request.body.marca, request.body.bloco, request.body.andar, request.body.numero]
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
        select * from  EQUIPAMENTO;
        `;

        console.log(sql);

        const results = await conexao.query(sql);
        response.status(200).json(results.rows);
    } catch (err) {
        response.status(404).send("Not found");
        console.log('Database ' + err);
    }
});

router.get('/utilizados', async (request, response) => { // usando await async
    try {
        const sql = `
        select * from  EQUIPAMENTO_UTILIZADO EU
            JOIN EQUIPAMENTO E
                ON E.npatrimonio = EU.equipamento;
        `;

        console.log(sql);

        const results = await conexao.query(sql);
        response.status(200).json(results.rows);
    } catch (err) {
        response.status(404).send("Not found");
        console.log('Database ' + err);
    }
});

//retorna o tipo de equipamento mais utilizado
router.get('/quantidade/maior', async (request, response) => { // usando await async
    try {
        const sql = `
        select E.tipo, count(*) from  EQUIPAMENTO_UTILIZADO EU
            JOIN EQUIPAMENTO E
                ON E.npatrimonio = EU.equipamento
            group by E.tipo
            order by count(*)
            LIMIT 1;
        `;

        console.log(sql);

        const results = await conexao.query(sql);
        response.status(200).json(results.rows);
    } catch (err) {
        response.status(404).send("Not found");
        console.log('Database ' + err);
    }
});

//retorna quantas vezes cada tipo de equipamento foi utilizado
router.get('/quantidade/tipo', async (request, response) => { // usando await async
    try {
        const sql = `
        select E.tipo, count(*) from  EQUIPAMENTO_UTILIZADO EU
            JOIN EQUIPAMENTO E
                ON E.npatrimonio = EU.equipamento
            group by E.tipo
            order by count(*)
        `;

        console.log(sql);

        const results = await conexao.query(sql);
        response.status(200).json(results.rows);
    } catch (err) {
        response.status(404).send("Not found");
        console.log('Database ' + err);
    }
});



module.exports = router;