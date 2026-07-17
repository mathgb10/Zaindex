// Se a largura da tela for maior ou igual 768px, as divs superiores a de número 30, passam a ter a classe hidden
// Afim de não exibir muitos gêneros de uma só vez
// Se for não for maior ou igual 768 adiciona a classe hidden nas divs superiores a de número 10
const limite = window.innerWidth >= 768 ? 20 : 10;
function hideGeneros() {
    const divs = document.querySelectorAll(".div-input");

    for (let i = 0; i < divs.length; i++) {
        if (i >= limite) {
            divs[i].classList.add("hidden");
        }
    }
}

// É executada quando o btn de Mostrar Mais ou Mostrar Menos é clicado
// Dependendo da situação ele vai exibir ou esconder alguns filtros
function showMore() {
    const divEscondidas = document.querySelectorAll(".hidden");
    const divs = document.querySelectorAll(".div-input");
    const btnShow = DOM.btnShow;

    // Se existir divs com classe hidden eu percorro todas removo a classe
    // depois muda o texto do btn
    if (divEscondidas.length > 0) {
        divEscondidas.forEach(e => {
            e.classList.remove("hidden");
        });
        btnShow.textContent = "Mostrar Menos"
        // Caso contrário (o btn for clicado e não existir divs com classe hidden) ele vai adicionar a classe
        // apartir do elemento de número 30, depois muda o texto do btn
    } else {
        for (let i = limite; i < divs.length; i++) {
            divs[i].classList.add("hidden");
        }
        btnShow.textContent = "Mostrar Mais"
    }
}