// Cria card e retorna o mesmo, sempre se baseando no item informado no parâmetro;
function createCards(item) {
    const card = document.createElement("div");
    const card_img = document.createElement("img");
    const card_header = document.createElement("div");

    card.className = "card";
    card_header.className = "card-header";
    card_img.src = item.images.webp.large_image_url;
    card_header.innerHTML = `<p>${item.title}</p>`;

    card.append(card_img, card_header);
    return card;
}

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