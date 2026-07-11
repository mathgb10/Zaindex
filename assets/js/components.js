function createCards(item) {
    const card = document.createElement("div");
    const card_img = document.createElement("img");
    const card_header = document.createElement("div");

    card.className = "card";
    card_header.className = "card-header";

    card_img.src = item.images.webp.large_image_url;
    card_header.innerHTML = `<p>${item.title}</p>`;

    card.appendChild(card_img,card_header);

    return card;
}