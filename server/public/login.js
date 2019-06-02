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

document.getElementById('linkSair').onclick = () => {
    document.cookie = 'dadosLogado=; expires=-1; path=/;'
    window.location.href = "../index.html";
}

const cookie = checkLogin();