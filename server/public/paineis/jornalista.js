if (!cookie.jornalista) {
    window.location.href = "index.html";
}

const materias = document.querySelector('#materias table');
const materiaEspecifica = document.getElementById('materiaEspecifica');
const filtroCheck = document.getElementById('checkMinhasMaterias');

let materiasVet = [];

const btnNovaMateria = document.getElementById('btnNovaMateria');
const boxNovaMateria = document.getElementById('cadastrarMateria');

btnNovaMateria.onclick = () => {
    show(boxNovaMateria);
    carregaPautasSemMateria();
};

function hide(element) {
    element.classList.add("hidden");
}

function show(element) {
    element.classList.remove("hidden");
}

async function getMaterias(filtro) {
    let strReq;
    if (!filtro) {
        strReq = `http://localhost:3004/api/materias/`;
    } else {
        strReq = `http://localhost:3004/api/materias/jornalista/${cookie.cpf}`;
    }


    console.log(strReq);
    const response = await axios.get(strReq);
    const resposta = JSON.parse(response.request.response);

    materias.innerHTML = '';
    materiasVet = [];

    let materiasTable = `
                        <tr>
                            <th>Titulo</th>
                            <th>Jornalista</th>
                            <th>Data inclusão</th>
                        </tr>`;

    let id = 0;

    for (linha of resposta) {
        console.log(linha);

        materiasTable += `
        <tr id="${id}">
        <td>${linha.titulo}</td>
        <td>${linha.nome}</td> 
        <td>${linha.data_inclusao}</td>
      </tr>`;
        id++;
        materiasVet.push({
            titulo: linha.titulo,
            jornalista: linha.jornalista,
            data_inclusao: linha.data_inclusao,
            texto: linha.texto,
        });
    }

    console.log(materiasTable);
    console.log(materiasVet);
    materias.innerHTML += materiasTable;


    const linhas = document.getElementsByTagName('tr');
    for (linha of linhas) {
        linha.onclick = function () {
            const idClicked = parseInt(this.id);
            showMateria(idClicked);
        }
    }

}

getMaterias(filtroCheck.checked);

async function showMateria(id) {
    hide(materias);
    show(materiaEspecifica);
    hide(document.getElementById("checkMaterias"));
    materiaEspecifica.innerHTML = `
                        <table>
                            <tr>
                            <th>Titulo</th>
                            <th>Jornalista</th>
                            <th>Data inclusão</th>
                            </tr>

                            <tr>
                                <td>${materiasVet[id].titulo}</td>
                                <td>${materiasVet[id].jornalista}</td>
                                <td>${materiasVet[id].data_inclusao}</td>
                            </tr>
                            
                        </table>    
                        <br >

                        <div id="materiaTexto">
                            ${materiasVet[id].texto} 
                        </div>
                        <br >
                        <a href="#" id="btnVoltarPautas" class="btn">Ver todas</a>
                            `;


    const btnVoltarPautas = document.getElementById('btnVoltarPautas');
    btnVoltarPautas.onclick = () => {
        hide(materiaEspecifica);
        show(materias);
        show(document.getElementById("checkMaterias"));
    };
}
async function carregaPautasSemMateria() {
    let strReq = `http://localhost:3004/api/pautas/semMateria`;
    const response = await axios.get(strReq);
    const resposta = JSON.parse(response.request.response);

    console.log(resposta)
    const possiveis = document.getElementById('pautasPossiveis');
    possiveis.innerHTML = "";


    for (linha of resposta) {
        possiveis.innerHTML += `<option value="${linha.titulo}">${linha.titulo}</option>`;
    }
}

document.getElementById('cadastrarMateriaBtn').onclick = async () => {

    const enviando = document.getElementById('enviando');
    const sucesso = document.getElementById('sucesso');
    const erro = document.getElementById('erro');

    enviando.classList.add('hidden');
    sucesso.classList.add('hidden');
    erro.classList.add('hidden');

    console.log(cookie);

    const info = {
        titulo: document.getElementById('pautasPossiveis').value,
        jornalista: cookie.cpf,
        texto: document.getElementById('texto').value,
    }

    enviando.classList.toggle('hidden');
    try {
        const resp = await axios({
            method: 'post',
            url: '/api/materias',
            data: info
        });

        enviando.classList.toggle('hidden');
        sucesso.classList.toggle('hidden');
        getMaterias(filtroCheck != null && filtroCheck.checked);
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
    document.getElementById('texto').value = "";
    carregaPautasSemMateria();
}

document.getElementById('voltarMateriaBtn').onclick = () => {
    hide(boxNovaMateria);
    limpaCampos();

}

filtroCheck.onclick = () => {
    getMaterias(filtroCheck.checked)
};