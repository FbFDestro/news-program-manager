document.getElementById('cadastrar').onclick = async () => {

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
            url: '/api/pessoas',
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