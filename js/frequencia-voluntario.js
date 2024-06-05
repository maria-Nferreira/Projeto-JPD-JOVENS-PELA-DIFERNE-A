let arrayVoluntario = []; // Inicializa como um array vazio
let arrayVoluntarioFiltrado = []; // Array para armazenar os resultados filtrados

// Função para buscar os dados dos voluntários de uma API ou banco de dados
async function buscarDadosVoluntarios() {
    try {
        const response = await fetch('URL_DA_API'); // Substitua 'URL_DA_API' pelo endpoint real
        const dados = await response.json();

        // Verifica se 'dados' é um array
        if (Array.isArray(dados)) {
            arrayVoluntario = dados;
            arrayVoluntarioFiltrado = dados; // Inicialmente, o array filtrado é o mesmo que o array original
        } else {
            console.error('Os dados recebidos não são um array:', dados);
        }
        
        renderizarListaVoluntarios();
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

// Função para renderizar a lista de voluntários na tabela
function renderizarListaVoluntarios() {
    const listaUsuarios = document.getElementById("lista-usuarios");
    listaUsuarios.innerHTML = ""; // Limpa a tabela

    arrayVoluntarioFiltrado.forEach(voluntario => {
        const row = document.createElement("tr");

        // Nome
        const nomeCell = document.createElement("td");
        nomeCell.textContent = voluntario.nome;
        nomeCell.classList.add("name-cell");
        row.appendChild(nomeCell);

        // Equipe
        const equipeCell = document.createElement("td");
        equipeCell.textContent = voluntario.equipe;
        row.appendChild(equipeCell);

        // Frequência
        const frequenciaCell = document.createElement("td");
        const selectFrequencia = document.createElement("select");
        selectFrequencia.innerHTML = `
            <option value="">Selecione</option>
            <option value="Presença">Presença</option>
            <option value="Falta">Falta</option>
            <option value="Um atraso">Um atraso</option>
            <option value="Dois atrasos">Dois atrasos</option>
        `;
        selectFrequencia.value = voluntario.frequenciaVoluntario;
        selectFrequencia.addEventListener("change", (e) => atualizarFrequencia(voluntario.id, e.target.value));
        frequenciaCell.appendChild(selectFrequencia);
        row.appendChild(frequenciaCell);

        // Ações (botão salvar)
        const acoesCell = document.createElement("td");
        const botaoSalvar = document.createElement("button");
        botaoSalvar.textContent = "Salvar";
        botaoSalvar.addEventListener("click", () => salvarVoluntario(voluntario.id));
        acoesCell.appendChild(botaoSalvar);
        row.appendChild(acoesCell);

        listaUsuarios.appendChild(row);
    });
}

// Função para atualizar a frequência de um voluntário
function atualizarFrequencia(id, frequencia) {
    const voluntario = arrayVoluntario.find(v => v.id === id);
    if (voluntario) {
        voluntario.frequenciaVoluntario = frequencia;
    }
}

// Função para salvar as alterações de um voluntário (exemplo de envio para API)
async function salvarVoluntario(id) {
    const voluntario = arrayVoluntario.find(v => v.id === id);
    if (voluntario) {
        try {
            const response = await fetch(`URL_DA_API/${id}`, { // Substitua 'URL_DA_API' pelo endpoint real
                method: 'PUT', // Ou 'POST', conforme a necessidade
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(voluntario)
            });

            if (!response.ok) {
                throw new Error('Erro ao salvar dados');
            }
            alert('Dados salvos com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar dados:', error);
            alert('Erro ao salvar dados.');
        }
    }
}

// Função para pesquisar voluntários pelo nome da ação
function pesquisarVoluntarios() {
    const termoPesquisa = document.getElementById("entrada-pesquisa").value.toLowerCase();
    arrayVoluntarioFiltrado = arrayVoluntario.filter(voluntario => 
        voluntario.nomeAcao.toLowerCase().includes(termoPesquisa)
    );
    renderizarListaVoluntarios();
}

// Função para pesquisar ações pelo nome
function pesquisarAcoes() {
    const termoPesquisa = document.getElementById("entrada-pesquisa").value.toLowerCase();
    const acoesFiltradas = arrayAcoes.filter(acao =>
        acao.nome.toLowerCase().includes(termoPesquisa)
    );
    renderizarListaAcoes(acoesFiltradas);
}

// Função para renderizar lista de ações
function renderizarListaAcoes(acoes) {
    const listaAcoes = document.getElementById("lista-acoes");
    listaAcoes.innerHTML = ""; // Limpar a lista de ações

    acoes.forEach(acao => {
        const itemAcao = document.createElement("li");
        itemAcao.textContent = `Nome: ${acao.nome}, Equipe: ${acao.equipe}`;
        itemAcao.addEventListener("click", () => selecionarAcao(acao.nome));
        listaAcoes.appendChild(itemAcao);
    });
}

// Função para selecionar ação e atualizar o span nome-acao
function selecionarAcao(nomeAcao) {
    const spanNomeAcao = document.getElementById("nome-acao");
    spanNomeAcao.textContent = nomeAcao;
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    buscarDadosVoluntarios(); // Buscar dados ao carregar a página
});
