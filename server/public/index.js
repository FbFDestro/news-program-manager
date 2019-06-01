let users = [];

function adicionaFiltro() {

    const filtro = {
        pesquisador: document.getElementsByName('pesquisador')[0].checked,
        jornalista: document.getElementsByName('jornalista')[0].checked,
        produtor: document.getElementsByName('produtor')[0].checked,
        editor: document.getElementsByName('editor')[0].checked
    }
    let strFiltro = '';
    let temFiltro = false;
    if (filtro.pesquisador || filtro.jornalista || filtro.produtor || filtro.editor) {
        strFiltro += 'filtros?';
    }
    if (filtro.pesquisador) {
        strFiltro += 'pesquisador=1'
        temFiltro = true;
    }
    if (filtro.jornalista) {
        if (temFiltro) {
            strFiltro += '&';
        }
        strFiltro += 'jornalista=1'
        temFiltro = true;
    }

    if (filtro.produtor) {
        if (temFiltro) {
            strFiltro += '&';
        }
        strFiltro += 'produtor=1'
        temFiltro = true;
    }
    if (filtro.editor) {
        if (temFiltro) {
            strFiltro += '&';
        }
        strFiltro += 'editor=1'
        temFiltro = true;
    }

    return strFiltro;
}

async function getUser() {
    try {

        let strReq = 'http://localhost:3000/api/pessoas/' + adicionaFiltro();

        const response = await axios.get(strReq);
        const resposta = JSON.parse(response.request.response);

        const usuarios = document.querySelector('#usuarios table');
        usuarios.innerHTML = '';

        if (resposta.length == 0) {
            usuarios.classList.add('hidden');
        } else {
            document.getElementById('nenhumUsuario').classList.add('hidden');
        }

        let usersTable = `
                   <tr>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Telefone</th>
                    <th>Cargos</th>
                </tr>`;

        let id = 0;

        for (linha of resposta) {
            console.log(linha);

            let cargos = "";
            if (linha.pesquisador != null) {
                cargos += "Pesquisador; "
            }
            if (linha.jornalista != null) {
                cargos += "Jornalista; "
            }
            if (linha.produtor != null) {
                cargos += "Produtor; "
            }
            if (linha.editor != null) {
                cargos += "Editor; "
            }

            usersTable += `
            <tr id="${id}">
            <td>${linha.nome}</td>
            <td>${linha.cpf}</td> 
            <td>${linha.tel}</td>
            <td>${cargos}</td>
          </tr>`;
            id++;
            users.push({
                nome: linha.nome,
                cpf: linha.cpf,
                tel: linha.tel,
                pesquisador: linha.pesquisador != null,
                jornalista: linha.jornalista != null,
                produtor: linha.produtor != null,
                editor: linha.editor != null
            });
        }

        console.log(usersTable);
        console.log(users);
        usuarios.innerHTML += usersTable;

        const linhas = document.getElementsByTagName('tr');
        for (linha of linhas) {
            linha.onclick = function () {
                console.log(this);
                this.classList.add('teste');
            }
        }

    } catch (error) {
        console.error(error);
    }
}

getUser();
document.getElementById('btnFiltro').onclick = getUser;