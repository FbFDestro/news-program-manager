if (!cookie.editor) {
    window.location.href = "index.html";
}


function hide(element) {
    element.classList.add("hidden");
}

function show(element) {
    element.classList.remove("hidden");
}

const materias = document.querySelector('#materias_finais table');
const materiaEspecifica = document.getElementById('materiaEspecifica');

async function getMateriasFinais(filtro) {
    let strReq = `http://localhost:  3004/api/materias_finais/`;
    console.log(strReq);
    const response = await axios.get(strReq);
    const resposta = JSON.parse(response.request.response);

    materias.innerHTML = '';
    materiasVet = [];

    let materiasTable = `
                <tr>
                    <th>Vídeo final</th>
                    <th>Editor</th>
                    <th>Data do episódio</th>
                </tr>`;

    let id = 0;
    for (linha of resposta) {
        console.log(linha);

        materiasTable += `
        <tr id="${id}">
        <td>${linha.video_final}</td>
        <td>${linha.nome}</td> 
        <td>${linha.episodio}</td>
      </tr>`;
        id++;
        materiasVet.push({
            video_final: linha.video_final,
            editor: linha.nome,
            episodio: linha.episodio
        });
    }

    materias.innerHTML += materiasTable;

    const linhas = document.getElementsByTagName('tr');
    for (linha of linhas) {
        linha.onclick = function () {
            const idClicked = parseInt(this.id);
            showMateria(idClicked);
        }
    }

}

async function showMateria(id) {
    hide(materias);
    show(materiaEspecifica);

    const strReq = `http://localhost:  3004/api/materias_finais//creditos/${materiasVet[id].video_final}`;
    const response = await axios.get(strReq);
    const resposta = JSON.parse(response.request.response);

    let listaParticipantes = "";
    if (resposta.length > 0) {
        const first = resposta[0];
        listaParticipantes += `
            <li>Pesquisador: ${first.pesquisador}</li>
            <li>Jornalista: ${first.jornalista}</li>
            <li>Produtor: ${first.produtor} </li>
            <li>Editor: ${first.editor}</li>
        `;
    }

    let num = 1;
    if (resposta[0].participante != null) {
        for (resp of resposta) {
            listaParticipantes += `<li>Participante ${num}: ${resp.participante}</li>`
            num++;
        }
    }

    materiaEspecifica.innerHTML = `
                        <table>
                            <tr>
                                <th>Vídeo final</th>
                                <th>Editor</th>
                                <th>Data do episódio</th>
                           </tr>

                            <tr>
                                <td>${materiasVet[id].video_final}</td>
                                <td>${materiasVet[id].editor}</td>
                                <td>${materiasVet[id].episodio}</td>
                            </tr>
                            
                        </table>    
                        <br >

                        <div id="materiaTexto">
                            <h4>Créditos finais</h4>
                            <br>
                            <ul id="listaParticipantes">
                                ${listaParticipantes}
                            </ul>
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


getMateriasFinais();