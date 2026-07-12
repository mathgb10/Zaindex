// Ao carregar a página
window.onload = () => {
    // Coleta os parametros na URL ou seja o ?filtro
    const params = new URLSearchParams(window.location.search);
    var url = params.get("filtro");
    
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
    search(params.get("pesquisa"));

    var u;
    if (url == null){
        u = "anime";
    } else {
        u = url;
    }

    // Funções que colocaram contéudos na página
    renderContent(u);
}

// Carrega conteudo da página
async function renderContent(url) {

    // Chama e armazena o retorno das funções que consomem a API;
    const melhoresAnimes = await fetchAPI(url,`/top/${url}`);
    const generos = await fetchAPI(url,`/genres/${url}`);
    const temporadaAnimes = await fetchAPI(url,"/seasons/now");

    // Funções para carregar conteúdos na página
    setSlides(melhoresAnimes);
    setMelhoresContent(melhoresAnimes);
    setTemporadaContent(temporadaAnimes);
    setGenerosFiltro(generos);
}