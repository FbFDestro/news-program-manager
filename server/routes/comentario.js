const express = require('express');
const router = express.Router();
const conexao = require('../conexao');

router.use(express.json()) // for parsing application/json
router.use(express.urlencoded({
    extended: true
}));


router.get('/', async (request, response) => { // usando await async
    try {
        const sql = `SELECT * FROM COMENTARIO`;

        console.log(sql);

        const results = await conexao.query(sql);
        response.status(200).json(results.rows);
    } catch (err) {
        response.status(404).send("Not found");
        console.log('Database ' + err);
    }
});

router.post('/', async (request, response) => {
    console.log(request.body.materia, request.body.produtor,request.body.data, request.body.texto);
    try {
        const sql = {
            text: 'INSERT INTO comentario ("materia", "produtor", "data", "texto") VALUES ($1, $2, $3, $4)',
            values: [request.body.materia, request.body.produtor, request.body.data, request.body.texto]
        }

        console.log(sql);

        await conexao.query(sql); // insere comentario

        response.status(200).send("comentario inserido com sucesso");
    } catch (err) {
        response.status(400).send("Falha ao inserir comentario!\n" + err.message);
        console.log('Database ' + err);
        // console.log(Object.getOwnPropertyNames(err));
    }
});

router.delete('/', async (request, response) => {
    console.log(request.body.materia, request.body.produtor, request.body.data);
    try {
        const sql = `DELETE FROM COMENTARIO C WHERE C.MATERIA = ${request.body.materia} AND C.PRODUTOR = ${request.body.produtor} AND C.DATA = ${request.body.data};`;

        console.log(sql);

        await conexao.query(sql); // insere pessoa

        response.status(200).send(`Comentario da materia: ${request.body.materia} removido com sucesso`);
    } catch (err) {
        response.status(400).send("Falha ao remover Comentario!\n" + err.message);
        console.log('Database ' + err);
        // console.log(Object.getOwnPropertyNames(err));
    }
});

module.exports = router;