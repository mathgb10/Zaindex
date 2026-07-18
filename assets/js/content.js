// Carrega no carrosel o conteudo usando o slide atual. 
function setCarrosel() {
    const img = DOM.placeholdersCarrosel.imgCarrosel;
    const btn = DOM.placeholdersCarrosel.btnCarrosel;
    const title = DOM.placeholdersCarrosel.txtCarrosel;

    const conteudo = slides[atual];

    img.src = conteudo.images.webp.large_image_url;
    title.innerText = conteudo.title;
    btn.onclick = ()=>setAnimeURL(conteudo.mal_id);
}

// Cards de melhores animes/mangas e etc.
function setCards(resultado, placeholder){;
    for (let i = 0; i < resultado.data.length; i++) {
        placeholder.appendChild(createCards(resultado.data[i]));
    }
}

// Gêneros de animes/mangas na aside 
function setGeneros(resultado,placeholder) {
    // Será adicionado a aside os gêneros 
    for (let i = 0; i < resultado.data.length; i++) {
        placeholder.appendChild(createGeneros(resultado.data[i]));
    }
    // Chama função que limita o tanto de gêneros listados
    hideGeneros();
}