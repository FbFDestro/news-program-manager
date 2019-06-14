const express = require('express');
const router = express.Router();
const conexao = require('../conexao');

router.use(express.json()) // for parsing application/json
router.use(express.urlencoded({
    extended: true
}));


router.get('/', async (request, response) => { // usando await async
    try {
        const sql = `SELECT M.TITULO, M.JORNALISTA, to_char(M.DATA_INCLUSAO, 'DD/MM/YYYY') AS DATA_INCLUSAO, M.TEXTO, P.CPF, P.NOME, P.TEL
                        FROM MATERIA M
                        join PESSOA P 
                            ON P.CPF = M.jornalista
                    order by M.data_inclusao;            
        `;

        console.log(sql);

        const results = await conexao.query(sql);
        response.status(200).json(results.rows);
    } catch (err) {
        response.status(404).send("Not found");
        console.log('Database ' + err);
    }
});

router.get('/quantidade/:mes', async (request, response) => { // usando await async
    try {
        const sql = `
            SELECT COUNT(*)
                FROM MATERIA M
                WHERE EXTRACT(MONTH FROM M.DATA_INCLUSAO)= ${request.params.mes};
        `;

        console.log(sql);

        const results = await conexao.query(sql);
        response.status(200).json(results.rows[0].count);
    } catch (err) {
        response.status(404).send("Not found");
        console.log('Database ' + err);
    }
});


router.get('/jornalista/:cpf', async (request, response) => { // usando await async
    try {
        const sql = `SELECT M.TITULO, M.JORNALISTA, to_char(M.DATA_INCLUSAO, 'DD/MM/YYYY') AS DATA_INCLUSAO, M.TEXTO, P.CPF, P.NOME, P.TEL
                        FROM MATERIA M
                        join PESSOA P 
                            ON P.CPF = M.jornalista
                    where M.jornalista = '${request.params.cpf}'
                    order by M.data_inclusao;          
        `;

        console.log(sql);

        const results = await conexao.query(sql);
        response.status(200).json(results.rows);
    } catch (err) {
        response.status(404).send("Not found");
        console.log('Database ' + err);
    }
});

router.get('/jornalistaspormes', async (request, response) => { // usando await async
    try {
        const sql = `
        SELECT M.JORNALISTA, EXTRACT(YEAR FROM M.DATA_INCLUSAO) AS YEAR, EXTRACT(MONTH FROM M.DATA_INCLUSAO) AS MONTH, COUNT(*)
            FROM MATERIA M
            GROUP BY M.JORNALISTA, EXTRACT(YEAR FROM M.DATA_INCLUSAO), EXTRACT(MONTH FROM M.DATA_INCLUSAO);
        `;

        console.log(sql);

        const results = await conexao.query(sql);
        response.status(200).json(results.rows);
    } catch (err) {
        response.status(404).send("Nothing found");
        console.log('Database ' + err);
    }
});

router.get('/quantidade/:jornalista', async (request, response) => { // usando await async
    try {
        const sql = `
            SELECT COUNT(*)
                FROM MATERIA M
                WHERE M.JORNALISTA = ${request.params.jornalista};
        `;

        console.log(sql);

        const results = await conexao.query(sql);
        response.status(200).json(results.rows[0].count);
    } catch (err) {
        response.status(404).send("Not found");
        console.log('Database ' + err);
    }
});


router.post('/', async (request, response) => {
    console.log(request.body.titulo, request.body.jornalista, request.body.texto);
    try {
        const sql = {
            text: 'INSERT INTO materia ("titulo", "jornalista", "texto") VALUES ($1, $2, $3)',
            values: [request.body.titulo, request.body.jornalista, request.body.texto]
        }

        console.log(sql);

        await conexao.query(sql); // insere pessoa

        response.status(200).send("Materia inserida com sucesso");
    } catch (err) {
        response.status(400).send("Falha ao inserir materia!\n" + err.message);
        console.log('Database ' + err);
        // console.log(Object.getOwnPropertyNames(err));
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const sql = `DELETE FROM MATERIA M WHERE M.TITULO = ${request.params.id};`;

        console.log(sql);

        await conexao.query(sql); // insere pessoa

        response.status(200).send(`Materia ${request.params.id} removida com sucesso`);
    } catch (err) {
        response.status(400).send("Falha ao remover materia!\n" + err.message);
        console.log('Database ' + err);
        // console.log(Object.getOwnPropertyNames(err));
    }
});

module.exports = router;