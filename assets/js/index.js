// Ao carregar a página
window.onload = () => {

    // Coleta os parametros na URL ou seja o ?filtro
    const params = new URLSearchParams(window.location.search);
    const url = params.get("filtro");

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

    // Funções que colocaram contéudos na página
    getCarrosel(url);
    getMelhoresContent(url);
}

window.onscroll = ()=>{
    document.querySelector('.navbar').style.position = 'fixed';
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

// Consome a API com os melhores animes/mangas e retorna um json
async function getMelhores(url) {
    // Se a url tiver valor inválido terá valor de anime
    const parametro_api = url || 'anime';

    try {
        const res = await fetch(`https://api.jikan.moe/v4/top/${parametro_api}`);
        // Caso eu não consiga chamar a API
        if (!res.ok) {
            console.log('Erro ao chamar API');
        }
        const resultado = await res.json();
        return resultado;
    } catch (error) {
        console.log(error);
    }
}

// Carrosel

let slides = [];
let atual = 0;
const dots = document.querySelectorAll('.dot');

// Pega os dados coletados da API e monta a lista de slides do carrossel
async function getCarrosel(url) {
    const resultado = await getMelhores(url);
    const tamanho = resultado.data.length;

    // Salvo os resultados da minha função que sorteia numeros com o mínimo 1 e máximo do length da resposta
    for (let i = 0; i < 4; i++) {
        const index = sortNumeros(0, tamanho - 1);
        slides.push(resultado.data[index]);
    }

    setCarrosel()
}

// Carrega no Carrosel o conteudo usando o slide atual. 
function setCarrosel() {

    const img = document.getElementById('img-placeholder');
    const btn = document.getElementById('btn-placeholder');
    const title = document.getElementById('txt-placeholder');

    const conteudo = slides[atual];

    img.src = conteudo.images.webp.large_image_url;
    title.innerText = conteudo.title;
    btn.onclick = () => {
        const url = new URL(window.location);
        url.searchParams.set("id",conteudo.mal_id);
        window.location.href=url;
        // window.location.href = window.location.href + `?id=${conteudo.mal_id}`;
    };
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

// Conteudo Principal
async function getMelhoresContent(url) {
    const resultado = await getMelhores(url);

    // Placeholder para os melhores conteudos
    const placeholder = document.getElementById("melhores-placeholder");

    // Será adicionado a página um card com a imagem e titulo das obras
    for (let i = 0; i < resultado.data.length; i++) {
        const card = document.createElement("div");
        const card_img = document.createElement("img");
        const card_header = document.createElement("header");
        card.className = "card";
        card_header.className = "card-header";

        card_img.src = resultado.data[i].images.webp.large_image_url;
        card_header.textContent = resultado.data[i].title;

        placeholder.appendChild(card);
        card.appendChild(card_img);
        card.appendChild(card_header);
    }
}