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
    
    // Chama e armazena o retorno das funções que consomem a API;
    const melhoresAnimes = await fetchAPI(`/top/${url}`);
    const generos = await fetchAPI(`/genres/${url}`);
    const temporadaAnimes = await fetchAPI("/seasons/now");

    if (!pesquisa) {
        setCards(melhoresAnimes, "melhores-placeholder");
        setCards(temporadaAnimes, "temporada-placeholder");
    } else {
        const conteudoPesquisado = await fetchAPI(`/${url}?q='${pesquisa}'`);
        setCards(conteudoPesquisado, "melhores-placeholder");
    }

    // Funções para carregar conteúdos na página
    setSlides(melhoresAnimes);
    setGeneros(generos);
}