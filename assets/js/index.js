// Marca o btn ativo, recupera a pesquisa na função search() e carrega o conteudo inicial
window.onload = () => {
    // Coleta os parametros na URL ou seja o ?filtro
    const url = getUrl('filtro');
    const btnsLinks = DOM.btnsLinks;

    // Vai percorrer os btns e caso o parametro informado tenha valor igual ao data "link" ele ficara com a classe active
    for (let i = 0; i < btnsLinks.length; i++) {
        if (btnsLinks[i].dataset.link === url) {
            btnsLinks[i].classList.add("active");
            // Caso nenhum filtro seja informado, mantém a Home como página ativa.
        } else {
            if (btnsLinks[i].dataset.link == 'index' && url == null) {
                btnsLinks[i].classList.add("active");
            }
        }
    }

    search(getUrl('pesquisa'));
    renderContent();
}

// Carrega conteudo da página o conteudo principal
async function renderContent() {
    const url = getUrl('filtro') || "anime";
    const pesquisa = getUrl('pesquisa');

    DOM.main.style.marginTop = "0px";

    clearContent();

    setLoading();

    await renderFilters();

    if (pesquisa) {
        renderSearch(url, pesquisa);
        return;
    }

    hiddenDefaulContent(false);

    const melhores = await fetchAPI(`/top/${url}`);
    const temporada = await fetchAPI("/seasons/now");

    clearContent();

    setCards(melhores, DOM.placeholders.melhores);
    setCards(temporada, DOM.placeholders.temporada);
    setSlides(melhores);
}

// Carrega os filtros/generos
async function renderFilters() {
    const url = getUrl('filtro') || "anime";
    console.log(url);
    const generos = await fetchAPI(`/genres/${url}`);
    // Funções para settar os generos na aside
    setGeneros(generos, DOM.placeholders.generos);
}

// Carrega o conteudo pesquisado e esconde o conteudo padrão da página
async function renderSearch(url, pesquisa) {
    clearContent("withoutGeneros");
    const conteudoPesquisado = await fetchAPI(`/${url}?q=${pesquisa}`);
    hiddenDefaulContent(true);

    // Altero o texto do titulo para o valor da pesquisa e chama a função para setar os cards
    document.getElementById("titulo-pesquisa").textContent = pesquisa;
    setCards(conteudoPesquisado, DOM.placeholders.pesquisa);
}