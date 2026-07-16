// Sorteia números
function sortNumeros(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Limpa os dados armazenados via LocalStorage e recarrega os conteudos da página;
function refreshApp() {
    try {
        localStorage.clear();
        console.log("✅ LocalStorage limpo");
        clearContent();
        renderContent();
    } catch (error) {
        console.log("❌ Erro: " + error);
    }
}
