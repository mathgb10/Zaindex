// Coleta o parametro na URL e retorna o valor desse parametro
function getUrl(parametro) {
    const params = new URLSearchParams(window.location.search);
    var url = params.get(parametro);
    return url;
}

// Envia o usuário para as respectivas páginas
function sendLink(filtro){
    const url = new URL(window.location);

    if(filtro === "index"){
        url.searchParams.delete("filtro");
    }else{
        url.searchParams.set("filtro", filtro);
    }

    window.location.href = url;
}
