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
    return cookie;
}


const nome = document.getElementById('nome');
const cpf = document.getElementById('cpf');
const telefone = document.getElementById('telefone');
const pesquisador= document.getElementsByName('pesquisador')[0];
const jornalista= document.getElementsByName('jornalista')[0];
const produtor= document.getElementsByName('produtor')[0];
const editor= document.getElementsByName('editor')[0];
const cookie = checkLogin();

nome.value = cookie.nome.trim();
cpf.value = cookie.cpf.trim();
telefone.value = cookie.tel.trim();
pesquisador.checked = cookie.pesquisador;
jornalista.checked = cookie.jornalista;
produtor.checked = cookie.produtor;
editor.checked = cookie.editor;

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
            method: 'put',
            url: '/api/pessoas',
            data: info
        });
        enviando.classList.toggle('hidden');
        sucesso.classList.toggle('hidden');
        console.log(resp);
        document.cookie = 'dadosLogado=; expires=-1; path=/;'
        window.location.href = "../index.html";
    } catch (err) {
        enviando.classList.toggle('hidden');
        erro.classList.toggle('hidden');
        erro.innerText = err.response.data;
    }
};