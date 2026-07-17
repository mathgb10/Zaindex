// Cria card e retorna o mesmo, sempre se baseando no item informado no parâmetro;
function createCards(item) {
    const card = document.createElement("div");
    const card_img = document.createElement("img");
    const card_header = document.createElement("div");

    card.className = "card";
    card_header.className = "card-header";
    card_img.src = item.images.webp.large_image_url;

    const nota = item.score / 2;
    const estrela = `<i class="fa-solid fa-star"></i>`;

    card_header.innerHTML = `<p>${item.title}</p> <div id='score'><p id='estrelas'>${estrela.repeat(nota)}</p><p id='nota'>${item.score}</p></div>`;
    
    // Overlay com informações no hover
    const overlay = document.createElement("div");
    const txt_overlay = document.createElement("p");
    const btn_overlay = document.createElement("div");

    txt_overlay.className = "txt-overlay";
    btn_overlay.className = "btns-overlay";
    overlay.className = "card-overlay";

    txt_overlay.textContent = `${item.synopsis}`;
    btn_overlay.innerHTML = `<div><button><i class="fa-solid fa-play"></i>Veja Mais</button></div>`
    
    overlay.append(txt_overlay,btn_overlay);

    card.append(card_img, card_header,overlay);

    card.addEventListener("mouseenter",()=>{
        overlay.classList.add("show");
    })

    card.addEventListener("mouseleave",()=>{
        overlay.classList.remove("show");
    })

    return card;
}

// Cria uma div com input radio e uma label informando genero  e retorna as mesmas
function createGeneros(item) {
    const div = document.createElement("div");
    const input = document.createElement("input");
    const span = document.createElement("span");

    div.className = "div-input";

    input.className = "filtro-input";
    input.type = "radio"
    input.id = item.mal_id;
    input.name = "filtro-input";
    span.textContent = item.name;

    div.append(input, span);
    return div;
}
