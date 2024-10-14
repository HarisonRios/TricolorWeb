const URL_TABELA = 'https://api.api-futebol.com.br/v1/campeonatos/10/tabela';
const URL_JOGOS_SPFC = 'https://api.api-futebol.com.br/v1/times/57/partidas/proximas';
const API_KEY = 'live_a26d93ab398eba6da704289ef49d14';

// Função para obter a tabela do Brasileirão
async function obterTabela() {
    const resp = await fetch(URL_TABELA, {
        headers: {
            'Authorization': `Bearer ${API_KEY}`
        }
    });
    if (resp.status === 200) {
        const data = await resp.json();
        console.log(data); 
        return data;
    } else {
        console.error(`Erro: ${resp.status} - ${resp.statusText}`);
        return null;
    }
}

// Função para obter os próximos jogos do SPFC
async function obterProximosJogos() {
    const resp = await fetch(URL_JOGOS_SPFC, {
        headers: {
            'Authorization': `Bearer ${API_KEY}`
        }
    });
    if (resp.status === 200) {
        const data = await resp.json();
        console.log(data); // Log para depuração
        return data;
    } else {
        console.error(`Erro: ${resp.status} - ${resp.statusText}`);
        return null;
    }
}


// Função para mostrar a tabela e os próximos jogos no HTML
async function mostrarTabelaEJogos() {
    const tabela = await obterTabela();
    const proximosJogos = await obterProximosJogos();

    const tabelaElement = document.getElementById('tabela');
    const jogosElement = document.getElementById('jogos');



    // FUNCÃO PARA MOSTRAR A TABELA
    if (tabela) {
        tabela.slice(0, 20).forEach(time => {
            const timeElement = document.createElement('div');
            timeElement.innerHTML = `
                <img src="${time.time.escudo}" alt="Escudo do ${time.time.nome_popular}" width="50">
                <span>${time.posicao}º - ${time.time.nome_popular} - ${time.pontos} pontos</span>
            `;
            tabelaElement.appendChild(timeElement);
        });
    }



// PRÓXIMOS JOGOS DO SPFC
if (proximosJogos && proximosJogos['campeonato-brasileiro']) {
    proximosJogos['campeonato-brasileiro'].forEach(jogo => {
        const jogoElement = document.createElement('div');

        const horarioJogo = jogo.hora_realizacao 
            ? `${jogo.data_realizacao} - ${jogo.hora_realizacao}` 
            : "Hora do jogo não definida";

        jogoElement.innerHTML = `
            <img src="${jogo.time_mandante.escudo}" alt="Escudo do ${jogo.time_mandante.nome}" width="50">
            <img src="${jogo.time_visitante.escudo}" alt="Escudo do ${jogo.time_visitante.nome}" width="50">
            <p>Próximo adversário: ${jogo.placar}</p>
            <p>Horário do jogo: ${horarioJogo}</p>
        `;
        
        jogosElement.appendChild(jogoElement);
        
        const linhaSeparacao = document.createElement('hr'); 
        jogosElement.appendChild(linhaSeparacao); 
    });
}
}



mostrarTabelaEJogos();
