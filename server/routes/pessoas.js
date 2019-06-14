const express = require('express');
const router = express.Router();
const conexao = require('../conexao');

router.use(express.json()) // for parsing application/json
router.use(express.urlencoded({
    extended: true
}));


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
        on pes.cpf = ed.cpf
        order by pes.nome;
        `;

        console.log(sql);

        const results = await conexao.query(sql);
        response.status(200).json(results.rows);
    } catch (err) {
        response.status(404).send("Not found");
        console.log('Database ' + err);
    }
});


router.get('/filtros', async (request, response) => { // usando await async
    try {

        let sql = `
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
        on pes.cpf = ed.cpf
        where `;

        let jaAdd = false;
        if (request.query.pesquisador) {
            if (jaAdd) sql += 'and '
            sql += `pesq.cpf is not null `;
            jaAdd = true;
        }
        if (request.query.jornalista) {
            if (jaAdd) sql += 'and '
            sql += `jor.cpf is not null `;
            jaAdd = true;
        }
        if (request.query.produtor) {
            if (jaAdd) sql += 'and '
            sql += `prod.cpf is not null `;
            jaAdd = true;
        }

        if (request.query.editor) {
            if (jaAdd) sql += 'and '
            sql += `ed.cpf is not null `;
            jaAdd = true;
        }

        sql += ';';

        console.log(sql);

        const results = await conexao.query(sql);
        response.status(200).json(results.rows);
    } catch (err) {
        response.status(404).send("Not found");
        console.log('Database ' + err);
    }
});


router.get('/quantidade/:cargo', async (request, response) => { // usando await async
    try {
        const sql = `
        select count(*) from  ${request.params.cargo};
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
    console.log(request.body.cpf, request.body.nome, request.body.telefone, request.body.pesquisador);
    try {
        const sql = {
            text: 'INSERT INTO pessoa ("cpf", "nome", "tel") VALUES ($1, $2, $3)',
            values: [request.body.cpf, request.body.nome, request.body.telefone]
        }

        console.log(sql);

        await conexao.query(sql); // insere pessoa

        if (request.body.pesquisador == true) { // insere pesquisador
            await conexao.query(`INSERT INTO PESQUISADOR ("cpf") VALUES (${request.body.cpf})`);
        }
        if (request.body.jornalista == true) {
            await conexao.query(`INSERT INTO JORNALISTA ("cpf") VALUES (${request.body.cpf})`);
        }
        if (request.body.produtor == true) {
            await conexao.query(`INSERT INTO PRODUTOR ("cpf") VALUES (${request.body.cpf})`);
        }
        if (request.body.editor == true) {
            await conexao.query(`INSERT INTO EDITOR ("cpf") VALUES (${request.body.cpf})`);
        }

        response.status(200).send("Dados inseridos com sucesso");
    } catch (err) {
        response.status(400).send("Falha ao inserir dados!\n" + err.message);
        console.log('Database ' + err);
        // console.log(Object.getOwnPropertyNames(err));
    }
});

router.put('/', async (request, response) => {
    console.log(request.body.cpf, request.body.nome, request.body.telefone, request.body.pesquisador);
    try {
        const sql = {
            text: 'INSERT INTO pessoa ("cpf", "nome", "tel") VALUES ($1, $2, $3) ON CONFLICT ("cpf") DO UPDATE SET nome = excluded.nome, tel = excluded.tel',
            values: [request.body.cpf, request.body.nome, request.body.telefone]
        }

        console.log(sql);

        await conexao.query(sql); // insere pessoa

        if (request.body.pesquisador == true) { // insere pesquisador
            await conexao.query(`INSERT INTO PESQUISADOR ("cpf") VALUES (${request.body.cpf}) ON CONFLICT("cpf") DO NOTHING`);
        }else{
            await conexao.query(`delete from pesquisador where cpf = '${request.body.cpf}'`)
        }
        if (request.body.jornalista == true) {
            await conexao.query(`INSERT INTO JORNALISTA ("cpf") VALUES (${request.body.cpf}) ON CONFLICT("cpf") DO NOTHING`);
        }else{
            await conexao.query(`delete from jornalista where cpf = '${request.body.cpf}'`)
        }
        if (request.body.produtor == true) {
            await conexao.query(`INSERT INTO PRODUTOR ("cpf") VALUES (${request.body.cpf}) ON CONFLICT("cpf") DO NOTHING`);
        }else{
            await conexao.query(`delete from produtor where cpf = '${request.body.cpf}'`)
        }
        if (request.body.editor == true) {
            await conexao.query(`INSERT INTO EDITOR ("cpf") VALUES (${request.body.cpf}) ON CONFLICT("cpf") DO NOTHING`);
        }else{
            await conexao.query(`delete from editor where cpf = '${request.body.cpf}'`)
        }

        response.status(200).send("Dados atualizados com sucesso");
    } catch (err) {
        response.status(400).send("Falha ao atualizar dados!\n" + err.message);
        console.log('Database ' + err);
        // console.log(Object.getOwnPropertyNames(err));
    }
});

module.exports = router;