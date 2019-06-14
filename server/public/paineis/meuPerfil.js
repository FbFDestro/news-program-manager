function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return JSON.parse(match[2]);
    else return null;
}

function checkLogin() {
    const cookie = getCookie("dadosLogado");
    if (cookie == null) {
        window.location.href = "../index.html";
    }
    const spanUser = document.querySelector('nav span');
    spanUser.innerHTML = `Logado como: ${cookie.nome}`
    console.log(cookie);

    return cookie;
}


const nome = document.getElementById('nome');
const telefone = document.getElementById('telefone');
const cargos = document.getElementById('cargos');
const cookie = checkLogin();
console.log(cookie);
nome.value = cookie.nome;

document.getElementById('atualizar').onclick = async () => {

    const enviando = document.getElementById('enviando');
    const sucesso = document.getElementById('sucesso');
    const erro = document.getElementById('erro');

    enviando.classList.add('hidden');
    sucesso.classList.add('hidden');
    erro.classList.add('hidden');

    const info = {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value,
        pesquisador: document.getElementsByName('pesquisador')[0].checked,
        jornalista: document.getElementsByName('jornalista')[0].checked,
        produtor: document.getElementsByName('produtor')[0].checked,
        editor: document.getElementsByName('editor')[0].checked,
    }

    enviando.classList.toggle('hidden');
    try {
        const resp = await axios({
            method: 'post',
            url: '/api/pessoas/atualizar',
            data: info
        });
        enviando.classList.toggle('hidden');
        sucesso.classList.toggle('hidden');
        console.log(resp);
    } catch (err) {
        enviando.classList.toggle('hidden');
        erro.classList.toggle('hidden');
        erro.innerText = err.response.data;
    }
};