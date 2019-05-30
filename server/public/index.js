async function getUser() {
    try {
        const response = await axios.get('http://localhost:3000/api/pessoas/await');
        const resps = JSON.parse(response.request.response);

        const imprime = document.getElementById('coisas');

        for (resp of resps) {
            console.log(resp);
            imprime.innerHTML += `<div id="pessoa" class="${resp.id}">${resp.firstname}</div>`
        }

    } catch (error) {
        console.error(error);
    }
}

document.getElementById("pesquisar").onclick = getUser;