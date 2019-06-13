if (!cookie.pesquisador) {
    window.location.href = "index.html";
}

const pautas = document.querySelector('#pautas table');
const pautaLinks = document.getElementById('pautaLinks')

function hide(element) {
    element.classList.add("hidden");
}

function show(element) {
    element.classList.remove("hidden");
}

let pautasVet = [];

const btnNovaPauta = document.getElementById('btnNovaPauta');
const boxNovaPauta = document.getElementById('cadastrarPauta');

btnNovaPauta.onclick = () => {
    show(boxNovaPauta);
}


async function showPauta(id) {
    hide(pautas);
    show(pautaLinks);
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
                        <a href="#" id="btnVoltarPautas" class="btn">Ver todas</a>
                            `;


    let strReq = `http://localhost:3002/api/pautas/link/${pautasVet[id].titulo}`;

    console.log(strReq);
    const response = await axios.get(strReq);
    const resposta = JSON.parse(response.request.response);

    console.log(resposta);

    const btnVoltarPautas = document.getElementById('btnVoltarPautas');
    btnVoltarPautas.onclick = () => {
        hide(pautaLinks);
        show(pautas);
    };
}

async function getPautas() {
    let strReq = `http://localhost:3002/api/pautas/`;

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
        <td>${linha.pesquisador}</td> 
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

getPautas();