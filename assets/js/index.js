// Marca o btn ativo, recupera a pesquisa na função search() e carrega o conteudo inicial
window.onload = () => {
    startPage();
}

function startPage() {
    setActiveLinks();
    search(getUrl('pesquisa'));
    renderContent();
}

async function renderHome() {
    return;
}

// Carrega conteudo da página o conteudo principal
async function renderContent() {
    const url = getUrl('filtro') || "anime";
    const pesquisa = getUrl('pesquisa');

    DOM.main.style.marginTop = "0px";

    renderFilters();

    if (pesquisa) {
        renderSearch(url, pesquisa);
        return;
    }

    hiddenDefaulContent(false);

    showLoading([
        DOM.placeholders.melhores,
        DOM.placeholders.temporada
    ]);

    const melhores = await fetchAPI(`/top/${url}`);
    const temporada = await fetchAPI("/seasons/now");

    hideLoading([
        DOM.placeholders.melhores,
        DOM.placeholders.temporada
    ]);

    clearContent();

    setCards(melhores, DOM.placeholders.melhores);
    setCards(temporada, DOM.placeholders.temporada);
    setSlides(melhores);
}

// Carrega os filtros/generos
async function renderFilters() {
    const url = getUrl('filtro') || "anime";
    const generos = await fetchAPI(`/genres/${url}`);
    // Funções para settar os generos na aside
    setGeneros(generos, DOM.placeholders.generos);
}

// Carrega o conteudo pesquisado e esconde o conteudo padrão da página
async function renderSearch(url, pesquisa) {
    hiddenDefaulContent(true);

    showLoading([
        DOM.placeholders.pesquisa
    ]);

    const conteudoPesquisado = await fetchAPI(`/${url}?q=${pesquisa}`);

    hideLoading([
        DOM.placeholders.pesquisa
    ]);
    // Altero o texto do titulo para o valor da pesquisa e chama a função para setar os cards
    document.getElementById("titulo-pesquisa").textContent = pesquisa;
    setCards(conteudoPesquisado, DOM.placeholders.pesquisa);
}