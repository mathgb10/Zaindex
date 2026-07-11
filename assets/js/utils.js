
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
    onde == 'index' ? window.location.href = origin : window.location.href = `?filtro=${onde}`;

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

function search(e) {
    const p = document.getElementById("pesquisa");
    p.value = e;
    toggleClearButton();
}

const pesquisa = document.getElementById("pesquisa");
pesquisa.addEventListener("input", toggleClearButton);

function toggleClearButton() {
    const btn = document.getElementById("limpar-pesquisa");

    btn.style.display = pesquisa.value.trim() ? "block" : "none";
}

function clearSearch() {
    pesquisa.value = "";
    toggleClearButton();
    const url = new URL(window.location);
    url.searchParams.delete("pesquisa");
    window.history.replaceState({},'',url)
}