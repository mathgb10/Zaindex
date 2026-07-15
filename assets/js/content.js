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
function setGeneros(resultado) {
    // Placeholder para os melhores conteudos
    const placeholder = document.getElementById(placeholders[2]);

    // Será adicionado a aside os gêneros 
    for (let i = 0; i < resultado.data.length; i++) {
        placeholder.appendChild(createGeneros(resultado.data[i]));
    }

    // Chama função que limita o tanto de gêneros listados
    hideGeneros();
}