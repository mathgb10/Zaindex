// Caso alguém realize uma pesquisa chama a função que exibe o btn que limpa pesquisa
const pesquisa = DOM.pesquisa;
pesquisa.addEventListener("input", toggleClearButton);

// Quando for realizado uma pesquisa, ele vai cancelar o submit padrão e difinir um valor para o parametro ?pesquisa
// depois disso vai chamar a função responsável por colocar os conteúdos na tela
function makeSearch(e) {
    e.preventDefault();
    const url = new URL(window.location);
    url.searchParams.set("pesquisa", pesquisa.value);
    window.history.replaceState({}, "", url);
    renderContent();
}

// Caso tenha algo na ?pesquisa o input vai ficar com esse valor
// Chama também a função que exibe o btn que limpa pesquisa
function search(e) {
    pesquisa.value = e;
    toggleClearButton();
}

// Função que exibe btn que limpa pesquisa
// Caso exista uma pesquisa ele aparece se não display = none;
function toggleClearButton() {
    const btn = DOM.btnLimparPesquisa;
    btn.style.display = pesquisa.value.trim() ? "block" : "none";
}

// Ao clicar no btn de limpar, essa função é chamada
// Ele zerá o input de pesquisa e limpa a pesquisa na URL
function clearSearch() {
    pesquisa.value = "";
    toggleClearButton();
    const url = new URL(window.location);
    url.searchParams.delete("pesquisa");
    window.history.replaceState({}, '', url)
    renderContent();
}