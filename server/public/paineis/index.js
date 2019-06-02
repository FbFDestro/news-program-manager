const cargos = ['pesquisador', 'jornalista', 'produtor', 'editor'];
for (cargo of cargos) {
    console.log(cookie[cargo]);
    if (!cookie[cargo]) {
        document.getElementById(cargo).classList.add("hidden");
    }
}