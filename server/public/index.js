let users = [];
const pesquisador = document.getElementsByName('pesquisador')[0];
const jornalista = document.getElementsByName('jornalista')[0];
const produtor = document.getElementsByName('produtor')[0];
const editor = document.getElementsByName('editor')[0];

function adicionaFiltro() {
  const filtro = {
    pesquisador: pesquisador.checked,
    jornalista: jornalista.checked,
    produtor: produtor.checked,
    editor: editor.checked
  };
  let strFiltro = '';
  let temFiltro = false;
  if (filtro.pesquisador || filtro.jornalista || filtro.produtor || filtro.editor) {
    strFiltro += 'filtros?';
  } else return '';

  if (filtro.pesquisador) {
    strFiltro += 'pesquisador=1';
    temFiltro = true;
  }
  if (filtro.jornalista) {
    if (temFiltro) {
      strFiltro += '&';
    }
    strFiltro += 'jornalista=1';
    temFiltro = true;
  }

  if (filtro.produtor) {
    if (temFiltro) {
      strFiltro += '&';
    }
    strFiltro += 'produtor=1';
    temFiltro = true;
  }
  if (filtro.editor) {
    if (temFiltro) {
      strFiltro += '&';
    }
    strFiltro += 'editor=1';
    temFiltro = true;
  }

  return strFiltro;
}

async function getUser() {
  try {
    let filtro = await adicionaFiltro();
    let strReq = `http://localhost:3004/api/pessoas/` + filtro;

    console.log(strReq);

    const response = await axios.get(strReq);
    const resposta = JSON.parse(response.request.response);

    const usuarios = document.querySelector('#usuarios table');
    usuarios.innerHTML = '';

    users = [];

    if (resposta.length == 0) {
      usuarios.classList.add('hidden');
      document.getElementById('nenhumUsuario').classList.remove('hidden');
    } else {
      usuarios.classList.remove('hidden');
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

      let cargos = '';
      if (linha.pesquisador) {
        cargos += 'Pesquisador; ';
      }
      if (linha.jornalista) {
        cargos += 'Jornalista; ';
      }
      if (linha.produtor) {
        cargos += 'Produtor; ';
      }
      if (linha.editor) {
        cargos += 'Editor; ';
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
        pesquisador: linha.pesquisador,
        jornalista: linha.jornalista,
        produtor: linha.produtor,
        editor: linha.editor
      });
    }

    console.log(usersTable);
    console.log(users);
    usuarios.innerHTML += usersTable;

    const linhas = document.getElementsByTagName('tr');
    for (linha of linhas) {
      linha.onclick = function() {
        const idClicked = parseInt(this.id);
        console.log(users[idClicked]);
        document.cookie = 'dadosLogado=' + JSON.stringify(users[idClicked]);
        window.location.href = '/paineis/index.html';
      };
    }
  } catch (error) {
    console.error(error);
  }
}

async function getQtds() {
  const qtdBox = document.getElementById('infoQuantidades');
  const cargos = ['pesquisador', 'jornalista', 'produtor', 'editor'];

  for (cargo of cargos) {
    const response = await axios.get(
      `http://localhost:3004/api/pessoas/quantidade/${cargo}`
    );
    const resposta = JSON.parse(response.request.response);
    console.log(resposta);

    qtdBox.innerHTML += `
            <div class="qtdBox">
               <h3>${cargo}</h3><span>${resposta}</span>
            </div>`;
  }
}

getUser();
getQtds();

// document.getElementById('btnFiltro').onclick = getUser;

pesquisador.onclick = getUser;
jornalista.onclick = getUser;
produtor.onclick = getUser;
editor.onclick = getUser;

function hide(element) {
  element.classList.add('hidden');
}

function show(element) {
  element.classList.remove('hidden');
}
