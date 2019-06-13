if (!cookie.pesquisador) {
    window.location.href = "index.html";
}

const pautas = document.querySelector('#pautas table');
const pautaLinks = document.getElementById('pautaLinks');
const filtro = document.getElementById('checkMinhasPautas');

function hide(element) {
    element.classList.add("hidden");
}

function show(element) {
    element.classList.remove("hidden");
}

let pautasVet = [];

const btnNovaPauta = document.getElementById('btnNovaPauta');
const boxNovaPauta = document.getElementById('cadastrarPauta');
const listaLink = document.getElementById('listaLinks');

btnNovaPauta.onclick = () => {
    show(boxNovaPauta);
}


async function showPauta(id) {
    hide(pautas);
    show(pautaLinks);
    hide(document.getElementById("checkPautas"));
    pautaLinks.innerHTML = `
                        <table>
                            <tr>
                                <th>Titulo</th>
                                <th>Pesquisador</th>
                                <th>Data inclusão</th>
                                <th>Resumo</th>
                            </tr>

                            <tr>
                                <td>${pautasVet[id].titulo}</td>
                                <td>${pautasVet[id].pesquisador}</td>
                                <td>${pautasVet[id].data_inclusao}</td>
                                <td>${pautasVet[id].resumo}</td>
                            </tr>
                            
                        </table>    
                        <br >

                        <table id="tableLinks">
                        
                        </table>
                        <br >
                        <a href="#" id="btnVoltarPautas" class="btn">Ver todas</a>
                            `;


    let strReq = `http://localhost:3002/api/pautas/link/${pautasVet[id].titulo}`;

    console.log(strReq);

    const response = await axios.get(strReq);
    const resposta = JSON.parse(response.request.response);

    if (resposta.length > 0) {
        const tableLinks = document.getElementById("tableLinks");
        tableLinks.innerHTML += `
        <tr>
            <th>Links</th>
        </tr>
        `;
    }


    for (resp of resposta) {
        tableLinks.innerHTML += `<tr><td>${resp.link}</td></tr>`;
    }


    const btnVoltarPautas = document.getElementById('btnVoltarPautas');
    btnVoltarPautas.onclick = () => {
        hide(pautaLinks);
        show(pautas);
        show(document.getElementById("checkPautas"));
    };
}

async function getPautas(filtro) {
    let strReq
    if (!filtro) {
        strReq = `http://localhost:3002/api/pautas/`;
    } else {
        strReq = `http://localhost:3002/api/pautas/pesquisador/${cookie.cpf}`;
    }


    console.log(strReq);
    const response = await axios.get(strReq);
    const resposta = JSON.parse(response.request.response);

    pautas.innerHTML = '';
    pautasVet = [];

    let pautasTable = `
                    <tr>
                     <th>Titulo</th>
                     <th>Pesquisador</th>
                      <th>Data inclusão</th>
                      <th>Resumo</th>
                    </tr>`;

    let id = 0;

    for (linha of resposta) {
        console.log(linha);

        pautasTable += `
        <tr id="${id}">
        <td>${linha.titulo}</td>
        <td>${linha.nome}</td> 
        <td>${linha.data_inclusao}</td>
        <td>${linha.resumo}</td>
      </tr>`;
        id++;
        pautasVet.push({
            titulo: linha.titulo,
            pesquisador: linha.pesquisador,
            data_inclusao: linha.data_inclusao,
            resumo: linha.resumo,
        });
    }

    console.log(pautasTable);
    console.log(pautasVet);
    pautas.innerHTML += pautasTable;


    const linhas = document.getElementsByTagName('tr');
    for (linha of linhas) {
        linha.onclick = function () {
            const idClicked = parseInt(this.id);
            showPauta(idClicked);
        }
    }

}

getPautas(filtro.checked);

document.getElementById('cadastrarPautaBtn').onclick = async () => {

    const enviando = document.getElementById('enviando');
    const sucesso = document.getElementById('sucesso');
    const erro = document.getElementById('erro');

    enviando.classList.add('hidden');
    sucesso.classList.add('hidden');
    erro.classList.add('hidden');

    console.log(cookie);

    const info = {
        titulo: document.getElementById('titulo').value,
        pesquisador: cookie.cpf,
        resumo: document.getElementById('resumo').value,
    }

    enviando.classList.toggle('hidden');
    try {
        const resp = await axios({
            method: 'post',
            url: '/api/pautas',
            data: info
        });

        const links = document.getElementsByClassName('link');
        for (link of links) {
            if (link.value) {
                await axios({
                    method: 'post',
                    url: '/api/pautas/link',
                    data: {
                        pauta: info.titulo,
                        link: link.value
                    }
                })
            }
        }


        enviando.classList.toggle('hidden');
        sucesso.classList.toggle('hidden');
        getPautas(filtro.checked);
        limpaCampos();
        console.log(resp);
    } catch (err) {
        enviando.classList.toggle('hidden');
        erro.classList.toggle('hidden');
        limpaCampos();
        erro.innerText = err.response.data;
    }
};

function limpaCampos() {
    document.getElementById('titulo').value = "";
    document.getElementById('resumo').value = "";
    listaLink.innerHTML = `<input type="text" class="link" placeholder="Link">`;
}

document.getElementById('voltarPautaBtn').onclick = () => {
    hide(boxNovaPauta);
    limpaCampos();

}

document.getElementById('addLinkPautaBtn').onclick = () => {
    const txtInput = document.createElement('input');
    txtInput.type = 'text';
    txtInput.classList.add('link');
    txtInput.placeholder = 'Link';
    listaLink.appendChild(txtInput);
}

filtro.onclick = () => {
    getPautas(filtro.checked);
}