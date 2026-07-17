let slides = [];
let atual = 0;
const dots = DOM.dots;

// Pega os dados coletados da API e monta a lista de slides do carrossel
function setSlides(r) {
    const resultado = r;
    const tamanho = resultado.data.length;

    // Salvo os resultados da minha função que sorteia numeros com o mínimo 1 e máximo do length da resposta
    while (slides.length < 4) {
        let index = sortNumeros(0, tamanho - 1);
        // Caso o valor já exista no "slides" vou passar reto se não vou incluir no array "slides" 
        if (!slides.includes(resultado)) {
            slides.push(resultado.data[index]);
        }
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