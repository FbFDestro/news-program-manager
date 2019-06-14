const express = require('express');
const router = express.Router();
const conexao = require('../conexao');

router.use(express.json()) // for parsing application/json
router.use(express.urlencoded({
    extended: true
}));


router.get('/', async (request, response) => { // usando await async
    try {
        const sql = `SELECT * FROM MATERIA_FINAL`;

        console.log(sql);

        const results = await conexao.query(sql);
        response.status(200).json(results.rows);
    } catch (err) {
        response.status(404).send("Not found");
        console.log('Database ' + err);
    }
});

//mostra todos as materias finais que forao ao ar no dia "data"
router.get('/episodio/:data', async (request, response) => { // usando await async
    try {
        const sql = `
            SELECT DISTINCT V.MATERIA
                FROM MATERIA_FINAL MF
                JOIN VIDEO V
                    ON V.MATERIA_FINAL = MF.VIDEO_FINAL
                WHERE TO_DATE(MF.EPISODIO, 'YYYY-MM-DD') = ${request.params.data}
        `;

        console.log(sql);

        const results = await conexao.query(sql);
        response.status(200).json(results.rows);
    } catch (err) {
        response.status(404).send("Not found");
        console.log('Database ' + err);
    }
});


router.get('/creditos/:titulo', async (request, response) => { // usando await async
    try {
        const sql = `
        SELECT V.MATERIA, PPES.NOME AS PESQUISADOR, PJOR.NOME AS JORNALISTA, PPRO.NOME AS PRODUTOR, PPAR.NOME AS PARTICIPANTE

            FROM VIDEO V

            JOIN APROVACAO A
                ON V.MATERIA = A.MATERIA
            JOIN PESSOA PPRO -- PESSOA "PRODUTOR"
                ON PPRO.CPF = A.PRODUTORAPROVADOR

            JOIN MATERIA M
                ON V.MATERIA = M.TITULO
            JOIN PESSOA PJOR -- PESSOA "JORNALISTA"
                ON PJOR.CPF = M.JORNALISTA

            JOIN PAUTA PA
                ON V.MATERIA = PA.TITULO
            JOIN PESSOA PPES -- PESSOA "PESQUISADOR"
                ON PPES.CPF = PA.PESQUISADOR

            LEFT JOIN PARTICIPA P
                ON V.MATERIA = P.MATERIA AND V.ARQUIVO = P.ARQUIVO
            LEFT JOIN PESSOA PPAR -- PESSOA "PARTICIPANTE"
                ON PPAR.CPF = P.PESSOA;
            
            WHERE V.MATERIA = ${request.params.titulo}
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


module.exports = router;