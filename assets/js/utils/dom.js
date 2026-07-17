// Variavel que carrega todos os elementos da página
const DOM = {
    // Nav e carrosel
    nav: document.querySelector('.navbar'),
    carrosel: document.querySelector('.carrosel'),
    dots: document.querySelectorAll('.dot'),
    // Aside
    pesquisa: document.getElementById('pesquisa'),
    btnLimparPesquisa: document.getElementById('limpar-pesquisa'),
    btnShow: document.getElementById('btn-mostrar'),
    // Conteudo principal
    main: document.getElementById('main'),
    contentSearch: document.querySelector(".content-search"),
    mainContent: document.querySelector(".main-content"),
    content: document.querySelectorAll(".content"),
    // Auxiliar
    btnsLinks: document.querySelectorAll(".btnLinks"),
    // Placeholders de conteudo
    placeholders: {
        melhores: document.getElementById("melhores-placeholder"),
        temporada: document.getElementById("temporada-placeholder"),
        generos: document.getElementById("generos-placeholder"),
        pesquisa: document.getElementById("pesquisa-placeholder"),
    },
    // Placeholders dentro dos placeholders de conteudo
    placeholdersCarrosel: {
        imgCarrosel: document.getElementById('img-placeholder'),
        btnCarrosel: document.getElementById('btn-placeholder'),
        txtCarrosel: document.getElementById('txt-placeholder'),
    }
}

// Zera o conteudo dos placeholders
function clearContent() {
    Object.values(DOM.placeholders).forEach((e) => {
        e.innerHTML = "";
    })
}

// Esconde o conteudo padrão, para quando uma pesquisa for realizada, caso não tenha mais uma pesquisa ele volta
// Mas quem manipula são as funções render
function hiddenDefaulContent(hidden) {
    const content = DOM.content;
    const carrosel = DOM.carrosel;
    const contentSearch = DOM.contentSearch;
    const mainContent = DOM.mainContent;

    const main = DOM.main;
    const nav = DOM.nav;
    const altura_navbar = nav.offsetHeight;
    
    if (hidden == false) {
        content.forEach((e) => {
            e.classList.remove("hidden");
        })
        carrosel.style.marginTop = `${altura_navbar}px`;
        carrosel.classList.remove("hidden");
        contentSearch.classList.add("hidden");
        mainContent.style.marginTop = "0px";
    } else {
        content.forEach((e) => {
            e.classList.add("hidden");
        })
        main.style.marginTop = `${altura_navbar}px`;
        carrosel.classList.add("hidden");
        contentSearch.classList.remove("hidden");
    }
}
