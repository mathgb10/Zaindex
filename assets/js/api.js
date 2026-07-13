// Erros no consumo de API
function errosApi(e) {
    console.log(`Erro ao chamar API em ${e}`);
}

async function fetchAPI(url, endpoint) {
    const URL = `https://api.jikan.moe/v4`;

    // Verifica se não existe a resposta da API na última requisição salva no localStorage
    // Se não existir ele consome a API e salva no localStorage
    if (!localStorage.getItem(`${endpoint}`)) {
        try {
            const res = await fetch(`${URL}${endpoint}`);
            // Caso eu não consiga chamar a API
            if (!res.ok) {
                errosApi(endpoint);
                return;
            }
            const resultado = await res.json();
            const validade = Date.now()+(24*60*60*1000);
            resultado.validade = validade;
            localStorage.setItem(`${endpoint}`, JSON.stringify(resultado));
            console.log(`✅ CONSUMI API PARA OS MELHORES: ${endpoint}`);
            return resultado;
        } catch (error) {
            console.log(error);
        }
    } else {
        const resultado = JSON.parse(localStorage.getItem(`${endpoint}`));
        console.log(`❌ NÃO CONSUMI API PARA OS MELHORES: ${endpoint}`);
        return resultado;
    }
}
