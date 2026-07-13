
// Se a página for scrollada, a navbar fica fixa, e o carrosel vai dar um margin top
let scrolladas = 0;
window.onscroll = () => {
    document.querySelector('.navbar').style.position = 'fixed';
    const altura_navbar = document.querySelector('.navbar').offsetHeight;
    document.querySelector('.carrosel').style.marginTop = `${altura_navbar}px`
}

// Envia o usuário para as respectivas páginas
function sendLink(e) {
    const onde = e;
    // Se o parametro tenha valor 'index' então levo o usuário a origem, se não adiciono um parametro ?filtro=
    onde == 'index' ? window.location.href = window.location.href="index.html" : window.location.href = `?filtro=${onde}`;
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
        document.getElementById("melhores-placeholder").innerHTML = null;
        document.getElementById("temporada-placeholder").innerHTML = null;
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

// Caso tenha algo na ?pesquisa o input vai ficar com esse valor
// Chama também a função que exibe o btn que limpa pesquisa
function search(e) {
    pesquisa.value = e;
    toggleClearButton();
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
    window.history.replaceState({},'',url)
}

function showMore() {
    const divEscondidas = document.querySelectorAll(".hidden");
    const divs = document.querySelectorAll(".div-input");
    console.log(divs);
    if(divEscondidas.length > 0){
        divEscondidas.forEach(e => {
            e.classList.remove("hidden");
        });
    } else {
        for(let i = 30; i < divs.length; i++){
            divs[i].classList.add("hidden");
        }
    }
    document.getElementById("btn-mostrar").textContent="Mostrar Menos"
}