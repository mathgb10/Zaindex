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

// Cards de melhores animes/mangas
function setMelhoresContent(resultado) {
    // Placeholder para os melhores conteudos
    const placeholder = document.getElementById("melhores-placeholder");

    // Será adicionado a página um card com a imagem e titulo das obras
    for (let i = 0; i < resultado.data.length; i++) {
        placeholder.appendChild(createCards(resultado.data[i]));
    }
}

// Cards de animes da temporada
function setTemporadaContent(resultado) {
    // Placeholder para os melhores conteudos
    const placeholder = document.getElementById("temporada-placeholder");
    
    // Será adicionado a página um card com a imagem e titulo das obras
    for (let i = 0; i < resultado.data.length; i++) {
        placeholder.appendChild(createCards(resultado.data[i]));
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
        // Depois da div de número 30, elas passaram a ter a classe hidden
        // Afins de não exibir muitas de uma vez
        if(i >= 30){
            div.classList.add("hidden");
        }
    }
}