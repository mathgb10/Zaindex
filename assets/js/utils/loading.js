function showLoading(placeholders) {
    placeholders.forEach((placeholder) => {
        placeholder.innerHTML = "";

        for (let i = 0; i < 4; i++) {
            placeholder.appendChild(createLoading());
        }
    });
}

function hideLoading(placeholders) {
    placeholders.forEach((placeholder) => {
        placeholder.innerHTML = "";
    });
}