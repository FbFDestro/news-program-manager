if (!cookie.produtor) {
    window.location.href = "index.html";
}

async function getEquipamento() {

    const boxEquipamento = document.getElementById('equipamentosProdutor');

    const response = await axios.get(`http://localhost:  3004/api/equipamentos/quantidadeUtilizada/total`);
    const resposta = JSON.parse(response.request.response);

    console.log(resposta);

    for (resp of resposta) {
        boxEquipamento.innerHTML += `
            <div class="qtdBox">
                <h3>${resp.tipo}</h3><span>${resp.count}x</span>
            </div>`;
    }


}

async function getCenarios() {

    const boxCenarios = document.getElementById('cenariosProdutor');

    const response = await axios.get(`http://localhost:  3004/api/locais/cenarios_mais_utilizados`);
    const resposta = JSON.parse(response.request.response);

    console.log(resposta);

    for (resp of resposta) {
        boxCenarios.innerHTML += `
            <div class="qtdBox">
                <h3>${resp.bloco}-${resp.andar}-${resp.numero_sala}</h3><span>${resp.qtdlocacoes}x</span>
            </div>`;
    }


}
getEquipamento();
getCenarios();