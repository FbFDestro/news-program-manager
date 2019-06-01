async function getUser() {
    try {
        const response = await axios.get('http://localhost:3000/api/pessoas/');
        const resposta = JSON.parse(response.request.response);

        const usuarios = document.querySelector('#usuarios table');

        let usersTable = '';

        for (linha of resposta) {
            console.log(linha);
            usersTable += `
            <tr>
            <td>${linha.nome}</td>
            <td>${linha.cpf}</td> 
            <td>${linha.tel}</td>
          </tr>`;
        }

        console.log(usersTable);
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