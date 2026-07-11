// Erros no consumo de API
function errosApi(e) {
    console.log(`Erro ao chamar API em ${e}`);
}

// Consome a API com os melhores animes/mangas e retorna um json
async function getMelhores(url) {
    // Se a url tiver valor inválido terá valor de anime
    const parametro_api = url || 'anime';

    // Verifica se não existe a resposta da API na última requisição salva no localStorage
    // Se não existir ele consome a API e salva no localStorage
    if (!localStorage.getItem(`save_melhores_${parametro_api}`)) {
        try {
            const res = await fetch(`https://api.jikan.moe/v4/top/${parametro_api}`);
            // Caso eu não consiga chamar a API
            if (!res.ok) {
                errosApi(getMelhores.name);
                return;
            }
            const resultado = await res.json();
            localStorage.setItem(`save_melhores_${parametro_api}`, JSON.stringify(resultado));
            console.log(`✅ CONSUMI API PARA OS MELHORES: ${parametro_api}`);
            return resultado;
        } catch (error) {
            console.log(error);
        }
    } else {
        const resultado = JSON.parse(localStorage.getItem(`save_melhores_${parametro_api}`));
        console.log(`❌ NÃO CONSUMI API PARA OS MELHORES: ${parametro_api}`);
        return resultado;
    }
}

// Consome a API com os animes da temporada e retorna um json
async function getTemporada() {
    // Verifica se não existe a resposta da API na última requisição salva no localStorage
    // Se não existir ele consome a API e salva no localStorage
    if (!localStorage.getItem(`save_temporada`)) {
        try {
            const res = await fetch(`https://api.jikan.moe/v4/seasons/now`);
            // Caso eu não consiga chamar a API
            if (!res.ok) {
                errosApi(getTemporada.name);
                return;
            }
            const resultado = await res.json();
            localStorage.setItem(`save_temporada`, JSON.stringify(resultado));
            console.log(`✅ CONSUMI API PARA OS ANIMES DA TEMPORADA`);
            return resultado;
        } catch (error) {
            console.log(error);
        }
    } else {
        const resultado = JSON.parse(localStorage.getItem(`save_temporada`));
        console.log(`❌ NÃO CONSUMI API PARA OS ANIMES DA TEMPORADA`);
        return resultado;
    }
}

// Consome a API com os gêneros de animes/mangas
async function getGeneros(url) {
    // Se a url tiver valor inválido terá valor de anime
    const parametros_api = url || 'anime';

    // Verifica se não existe a resposta da API na última requisição salva no localStorage
    // Se não existir ele consome a API e salva no localStorage
    if (!localStorage.getItem(`save_generos_${parametros_api}`)) {
        try {
            const res = await fetch(`https://api.jikan.moe/v4/genres/${parametros_api}`);
            // Caso eu não consiga chamar API
            if (!res.ok) {
                errosApi(getGeneros.name);
                return;
            }
            const resultado = await res.json();
            localStorage.setItem(`save_generos_${parametros_api}`, JSON.stringify(resultado));
            console.log(`✅ CONSUMI API PARA OS GENEROS DOS: ${parametros_api}`);
            return resultado;
        } catch (error) {
            console.log(error);
        }
    } else {
        const resultado = JSON.parse(localStorage.getItem(`save_generos_${parametros_api}`));
        console.log(`❌ NÃO CONSUMI API PARA OS GENEROS DOS: ${parametros_api}`);
        return resultado;
    }
}
