const express = require('express');
const router = express.Router();
const conexao = require('../conexao');

router.use(express.json()) // for parsing application/json
router.use(express.urlencoded({
    extended: true
}));


router.post('/', async (request, response) => {
    console.log(request.body.video_final, request.body.editor, request.body.bloco, request.body.andar, request.body.numero, request.body.data, request.body.periodo, request.body.episodio);
    try {
        const sql = {
            text: 'INSERT INTO MATERIA_FINAL ("video_final", "editor", bloco, andar, numero, data, periodo, episodio) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            values: [request.body.video_final, request.body.editor, request.body.bloco, request.body.andar, request.body.numero, request.body.data, request.body.periodo, request.body.episodio]
        }

        console.log(sql);

        await conexao.query(sql);

        response.status(200).send("Materia inserida com sucesso");
    } catch (err) {
        response.status(400).send("Falha ao inserir Materia!\n" + err.message);
        console.log('Database ' + err);
        // console.log(Object.getOwnPropertyNames(err));
    }
});

router.delete('/:video_final', async (request, response) => {
    console.log(request.params.video_final);
    try {
        const sql = `delete from MATERIA_FINAL where video_final = '${request.params.video_final}';`;

        console.log(sql);

        await conexao.query(sql);

        response.status(200).send("Materia deletada com sucesso");
    } catch (err) {
        response.status(400).send("Falha ao deletar Materia!\n" + err.message);
        console.log('Database ' + err);
        // console.log(Object.getOwnPropertyNames(err));
    }
});



router.get('/', async (request, response) => { // usando await async
    try {
        const sql = `SELECT MF.video_final, MF.EDITOR, MF.BLOCO, MF.ANDAR, MF.NUMERO,
                to_char(MF.DATA, 'DD/MM/YYYY') as data, mf.periodo,
                to_char(mf.episodio, 'DD/MM/YYYY') as episodio, p.cpf, p.nome, p.tel
            FROM MATERIA_FINAL MF
            INNER JOIN PESSOA P 
                ON MF.EDITOR = P.CPF;
        `;

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
        SELECT  V.MATERIA, PPES.NOME AS PESQUISADOR, PJOR.NOME AS JORNALISTA, PPRO.NOME AS PRODUTOR, PEDI.NOME AS EDITOR, PPAR.NOME AS PARTICIPANTE

        FROM VIDEO V

        JOIN APROVACAO A
            ON V.MATERIA = A.MATERIA
        JOIN PESSOA PPRO -- PESSOA "PRODUTOR"
            ON PPRO.CPF = A.PRODUTOR_APROVADOR

        JOIN MATERIA M
            ON V.MATERIA = M.TITULO
        JOIN PESSOA PJOR -- PESSOA "JORNALISTA"
            ON PJOR.CPF = M.JORNALISTA

        JOIN PAUTA PA
            ON V.MATERIA = PA.TITULO
        JOIN PESSOA PPES -- PESSOA "PESQUISADOR"
            ON PPES.CPF = PA.PESQUISADOR

        JOIN MATERIA_FINAL MF
            ON V.MATERIA_FINAL = MF.VIDEO_FINAL
        JOIN PESSOA PEDI
            ON PEDI.CPF = MF.EDITOR

        LEFT JOIN PARTICIPA P
            ON V.MATERIA = P.MATERIA AND V.ARQUIVO = P.ARQUIVO
        LEFT JOIN PESSOA PPAR -- PESSOA "PARTICIPANTE"
            ON PPAR.CPF = P.PESSOA
            
            WHERE V.MATERIA_FINAL = '${request.params.titulo}';
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