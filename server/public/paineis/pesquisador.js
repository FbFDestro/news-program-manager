if (!cookie.pesquisador) {
    window.location.href = "index.html";
}


let pautasVet = [];

const btnNovaPauta = document.getElementById('btnNovaPauta');
const boxNovaPauta = document.getElementById('cadastrarPauta');
btnNovaPauta.onclick = () => {

    boxNovaPauta.classList.remove("hidden");

}

async function getPautas() {
    let strReq = `http://localhost:3002/api/pautas/`;

    console.log(strReq);
    const response = await axios.get(strReq);
    const resposta = JSON.parse(response.request.response);

    const pautas = document.querySelector('#pautas table');
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
}

getPautas();