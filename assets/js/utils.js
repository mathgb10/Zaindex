const placeholders = [
    "melhores-placeholder",
    "temporada-placeholder",
    "filtros-placeholder",
]

function clearContent(){
    placeholders.forEach((e)=>{
        document.getElementById(e).innerHTML = "";
    })
}

// Se a página for scrollada, a navbar fica fixa, e o carrosel vai dar um margin top caso ele esteja com a classe hidden
// a margin fica no main
let scrolladas = 0;
if(scrolladas == 0){
    window.onscroll = () => {
            const carrosel = document.querySelector('.carrosel');
            const main = document.getElementById("main");
            const nav = document.querySelector('.navbar');
            
            nav.style.position = 'fixed';
            const altura_navbar = nav.offsetHeight;

            if(carrosel.classList.contains("hidden")){
                main.style.marginTop = `${altura_navbar}px`;
            } else {
                carrosel.style.marginTop = `${altura_navbar}px`;
            }
    }
    scrolladas += 1;
}

// Envia o usuário para as respectivas páginas
function sendLink(e) {
    const onde = e;
    // Se o parametro tenha valor 'index' então levo o usuário a origem, se não adiciono um parametro ?filtro=
    onde == 'index' ? window.location.href = window.location.href = "index.html" : window.location.href = `?filtro=${onde}`;
}

// Sorteia números
function sortNumeros(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Limpa os dados armazenados via LocalStorage e recarrega os conteudos da página;
function refreshApp() {
    try {
        localStorage.clear();
        console.log("✅ LocalStorage limpo");
        clearContent();
        renderContent();
    } catch (error) {
        console.log("❌ Erro: " + error);
    }
}

// Carrosel

let slides = [];
let atual = 0;
const dots = document.querySelectorAll('.dot');

// Pega os dados coletados da API e monta a lista de slides do carrossel
function setSlides(r) {
    const resultado = r;
    const tamanho = resultado.data.length;

    // Salvo os resultados da minha função que sorteia numeros com o mínimo 1 e máximo do length da resposta
    for (let i = 0; i < 4; i++) {
        const index = sortNumeros(0, tamanho - 1);
        slides.push(resultado.data[index]);
    }

    setCarrosel()
}

// Colocando um evento "click" em todos os "pontos", esse evento vai chamar a função responsável
// por chamar a função que altera o carrosel, ela leva de parametro o "ponto" e o "indice"
dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        dotEvent(dot, i);
    })
})

function dotEvent(dot, index) {
    atual = index;
    setCarrosel();
    // Percorre os "pontos" e tira a classe "active" de todos
    dots.forEach(i => {
        i.classList.remove('active');
    });
    // Adiciono a classe "active" ao "ponto" que foi clicado
    dot.classList.add('active');
}

// Pesquisa

// Caso alguém realize uma pesquisa chama a função que exibe o btn que limpa pesquisa
const pesquisa = document.getElementById("pesquisa");
pesquisa.addEventListener("input", toggleClearButton);

function makeSearch() {
    const url = new URL(window.location);
    url.searchParams.set("pesquisa", pesquisa.value);
    window.history.replaceState({}, '', url);
    renderContent();
}

// Caso tenha algo na ?pesquisa o input vai ficar com esse valor
// Chama também a função que exibe o btn que limpa pesquisa
function search(e) {
    pesquisa.value = e;
    toggleClearButton();
    makeSearch();
}

// Função que exibe btn que limpa pesquisa
// Caso exista uma pesquisa ele aparece se não display = none;
function toggleClearButton() {
    const btn = document.getElementById("limpar-pesquisa");
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

// Se a largura da tela for maior ou igual 768px, as divs superiores a de número 30, passam a ter a classe hidden
// Afim de não exibir muitos gêneros de uma só vez
// Se for não for maior ou igual 768 adiciona a classe hidden nas divs superiores a de número 10
function hideGeneros() {
    const div = document.querySelectorAll(".div-input");
    const limite = window.innerWidth >= 768 ? 30 : 10;

    for (let i = 0; i < div.length; i++) {
        if (i >= limite) {
            div[i].classList.add("hidden");
        }
    }
}

// É executada quando o btn de Mostrar Mais ou Mostrar Menos é clicado
// Dependendo da situação ele vai exibir ou esconder alguns filtros
function showMore() {
    const divEscondidas = document.querySelectorAll(".hidden");
    const divs = document.querySelectorAll(".div-input");

    // Se existir divs com classe hidden eu percorro todas removo a classe
    // depois muda o texto do btn
    if (divEscondidas.length > 0) {
        divEscondidas.forEach(e => {
            e.classList.remove("hidden");
        });
        document.getElementById("btn-mostrar").textContent = "Mostrar Menos"
        // Caso contrário (o btn for clicado e não existir divs com classe hidden) ele vai adicionar a classe
        // apartir do elemento de número 30, depois muda o texto do btn
    } else {
        const limite = window.innerWidth >= 768 ? 30 : 10;
        for (let i = limite; i < divs.length; i++) {
            divs[i].classList.add("hidden");
        }
        document.getElementById("btn-mostrar").textContent = "Mostrar Mais"
    }
}

// Coleta o parametro na URL e retorna o valor desse parametro
function getUrl(parametro) {
    const params = new URLSearchParams(window.location.search);
    var url = params.get(parametro);
    return url;
}
