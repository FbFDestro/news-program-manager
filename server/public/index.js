let users = [];

async function getUser() {
    try {
        const response = await axios.get('http://localhost:3000/api/pessoas/');
        const resposta = JSON.parse(response.request.response);

        const usuarios = document.querySelector('#usuarios table');

        if (resposta.length == 0) {
            usuarios.classList.add('hidden');
        } else {
            document.getElementById('nenhumUsuario').classList.add('hidden');
        }

        let usersTable = '';
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