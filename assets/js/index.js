// Ao carregar a página
window.onload = () => {
    // Coleta os parametros na URL ou seja o ?filtro
    const url = getUrl('filtro');
    const btnsLinks = document.querySelectorAll(".btnLinks");

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

    // Funções que coloca o conteúdo pesquisa na URL no input de pesquisa;
    search(getUrl('pesquisa'));
    // Funções que colocaram contéudos na página
    renderContent();
}

// Carrega conteudo da página
async function renderContent() {
    const url = getUrl('filtro') || "anime";
    const pesquisa = getUrl('pesquisa');

    const main = document.getElementById("main");
    main.style.marginTop = `0px`;

    renderFilters(url);

    if (pesquisa) {
        renderSearch(url, pesquisa);
        return;
    }

    hiddenDefaulContent("no");

    // Chama e armazena o retorno das funções que consomem a API;
    const melhoresAnimes = await fetchAPI(`/top/${url}`);
    const temporadaAnimes = await fetchAPI("/seasons/now");

    // Funções para carregar conteúdos na página
    setCards(melhoresAnimes, placeholders[0]);
    setCards(temporadaAnimes, placeholders[1]);
    setSlides(melhoresAnimes);

}

async function renderFilters(url) {
    const generos = await fetchAPI(`/genres/${url}`);
    setGeneros(generos);
}

async function renderSearch(url, pesquisa) {
    const conteudoPesquisado = await fetchAPI(`/${url}?q=${pesquisa}`);
    hiddenDefaulContent("yes");

    document.getElementById("titulo-pesquisa").textContent = pesquisa;
    setCards(conteudoPesquisado, placeholders[3]);
}