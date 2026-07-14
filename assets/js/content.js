// Conteudo Principal

// Carrega no carrosel o conteudo usando o slide atual. 
function setCarrosel() {
    const img = document.getElementById('img-placeholder');
    const btn = document.getElementById('btn-placeholder');
    const title = document.getElementById('txt-placeholder');

    const conteudo = slides[atual];

    img.src = conteudo.images.webp.large_image_url;
    title.innerText = conteudo.title;
    btn.onclick = () => {
        const url = new URL(window.location);
        url.searchParams.set("id", conteudo.mal_id);
        window.location.href = url;
        // window.location.href = window.location.href + `?id=${conteudo.mal_id}`;
    };
}

// Cria e adiciona conteúdo na página

// Cards de melhores animes/mangas e etc.
function setCards(resultado, placeholder) {
    const place = document.getElementById(placeholder);
    for (let i = 0; i < resultado.data.length; i++) {
        place.appendChild(createCards(resultado.data[i]));
    }
}

// Gêneros de animes/mangas na aside 
function setGenerosFiltro(resultado) {
    // Placeholder para os melhores conteudos
    const placeholder = document.getElementById("filtros-placeholder");

    // Será adicionado a página um card com a imagem e titulo das obras
    for (let i = 0; i < resultado.data.length; i++) {
        const div = document.createElement("div");
        const input = document.createElement("input");
        const span = document.createElement("span");

        div.className = "div-input";

        input.className = "filtro-input";
        input.type = "radio"
        input.id = resultado.data[i].mal_id;
        input.name = "filtro-input";
        span.textContent = resultado.data[i].name;

        placeholder.appendChild(div);
        div.appendChild(input);
        div.appendChild(span);

        // Se a largura da tela for maior ou igual 768px, as divs superiores a de número 30, passam a ter a classe hidden
        // Afim de não exibir muitos gêneros de uma só vez
        // Se for não for maior ou igual 768 adiciona a classe hidden nas divs superiores a de número 10
        if (window.innerWidth >= 768) {
            if (i >= 30) {
                div.classList.add("hidden");
            }
        } else {
            if (i >= 10) {
                div.classList.add("hidden");
            }
        }
    }
}