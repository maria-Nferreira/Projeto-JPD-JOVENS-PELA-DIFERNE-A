let arrayVoluntario = []; // Inicializa como um array vazio
let arrayVoluntarioFiltrado = []; // Array para armazenar os resultados filtrados
let arrayAcoes = []; // Array para armazenar as ações recuperadas

// Função para buscar os dados dos voluntários de uma API ou banco de dados
async function buscarDadosVoluntarios() {
    try {
        const response = await fetch('URL_DA_API_VOLUNTARIOS'); // Substitua 'URL_DA_API_VOLUNTARIOS' pelo endpoint real
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

// Função para buscar os nomes das ações de uma API ou banco de dados
async function buscarNomesAcoes() {
    try {
        const response = await fetch('URL_DA_API_ACOES'); // Substitua 'URL_DA_API_ACOES' pelo endpoint real
        const dados = await response.json();

        // Verifica se 'dados' é um array
        if (Array.isArray(dados)) {
            arrayAcoes = dados;
            preencherDropdownAcoes();
        } else {
            console.error('Os dados recebidos não são um array:', dados);
        }
    } catch (error) {
        console.error('Erro ao buscar dados das ações:', error);
    }
}

// Função para preencher o dropdown com os nomes das ações
function preencherDropdownAcoes() {
    let dropdownMenuList = document.getElementById("dropdown-menu-list");
    dropdownMenuList.innerHTML = ""; // Limpa a lista

    arrayAcoes.forEach(acao => {
        let listItem = document.createElement("li");
        let linkItem = document.createElement("a");
        linkItem.classList.add("dropdown-item");
        linkItem.href = "#";
        linkItem.textContent = acao.nome;
        linkItem.addEventListener("click", () => selecionarAcao(acao.nome, acao.id)); // Passa o id da ação para a função selecionarAcao
        listItem.appendChild(linkItem);
        dropdownMenuList.appendChild(listItem);
    });
}

// Função para renderizar a lista de voluntários na tabela
function renderizarListaVoluntarios() {
    let listaUsuarios = document.getElementById("lista-usuarios");
    listaUsuarios.innerHTML = ""; // Limpa a tabela

    arrayVoluntarioFiltrado.forEach(voluntario => {
        let row = document.createElement("tr");

        // Nome
        let nomeCell = document.createElement("td");
        nomeCell.textContent = voluntario.nome;
        nomeCell.classList.add("name-cell");
        row.appendChild(nomeCell);

        // Equipe
        let equipeCell = document.createElement("td");
        equipeCell.textContent = voluntario.equipe;
        row.appendChild(equipeCell);

        // Frequência
        let frequenciaCell = document.createElement("td");
        let selectFrequencia = document.createElement("select");
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
        let acoesCell = document.createElement("td");
        let botaoSalvar = document.createElement("button");
        botaoSalvar.textContent = "Salvar";
        botaoSalvar.addEventListener("click", () => salvarVoluntario(voluntario.id));
        acoesCell.appendChild(botaoSalvar);
        row.appendChild(acoesCell);

        listaUsuarios.appendChild(row);
    });
}

// Função para atualizar a frequência de um voluntário
function atualizarFrequencia(id, frequencia) {
    let voluntario = arrayVoluntario.find(v => v.id === id);
    if (voluntario) {
        voluntario.frequenciaVoluntario = frequencia;
    }
}

// Função para salvar as alterações de um voluntário (exemplo de envio para API)
async function salvarVoluntario(id) {
    let voluntario = arrayVoluntario.find(v => v.id === id);
    if (voluntario) {
        try {
            let response = await fetch(`URL_DA_API_VOLUNTARIOS/${id}`, { // Substitua 'URL_DA_API_VOLUNTARIOS' pelo endpoint real
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
    let termoPesquisa = document.getElementById("entrada-pesquisa").value.toLowerCase();
    arrayVoluntarioFiltrado = arrayVoluntario.filter(voluntario => 
        voluntario.nomeAcao.toLowerCase().includes(termoPesquisa)
    );
    renderizarListaVoluntarios();
}

// Função para pesquisar ações pelo nome
function pesquisarAcoes() {
    let termoPesquisa = document.getElementById("entrada-pesquisa").value.toLowerCase();
    let acoesFiltradas = arrayAcoes.filter(acao =>
        acao.nome.toLowerCase().includes(termoPesquisa)
    );
    renderizarListaAcoes(acoesFiltradas);
}

// Função para renderizar lista de ações
function renderizarListaAcoes(acoes) {
    let listaAcoes = document.getElementById("lista-acoes");
    listaAcoes.innerHTML = ""; // Limpar a lista de ações

    acoes.forEach(acao => {
        let itemAcao = document.createElement("li");
        itemAcao.textContent = `Nome: ${acao.nome}, Equipe: ${acao.equipe}`;
        itemAcao.addEventListener("click", () => selecionarAcao(acao.nome, acao.id));
        listaAcoes.appendChild(itemAcao);
    });
}

// Função para selecionar ação e atualizar o span nome-acao
async function selecionarAcao(nomeAcao, idAcao) {
    let spanNomeAcao = document.getElementById("nome-acao");
    spanNomeAcao.textContent = nomeAcao;
    await buscarVoluntariosPorAcao(idAcao); // Busca os voluntários para a ação selecionada
}

// Função para buscar os voluntários de uma ação específica
async function buscarVoluntariosPorAcao(idAcao) {
    try {
        let response = await fetch(`URL_DA_API_VOLUNTARIOS_POR_ACAO/${idAcao}`); // Substitua 'URL_DA_API_VOLUNTARIOS_POR_ACAO' pelo endpoint real
        let dados = await response.json();

        // Verifica se 'dados' é um array
        if (Array.isArray(dados)) {
            arrayVoluntarioFiltrado = dados;
        } else {
            console.error('Os dados recebidos não são um array:', dados);
        }
        
        renderizarListaVoluntarios();
    } catch (error) {
        console.error('Erro ao buscar dados dos voluntários:', error);
    }
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('buscar-acoes').addEventListener('click', () => {
        document.getElementById('dropdownMenuButton').disabled = false;
        buscarNomesAcoes(); // Buscar nomes das ações ao clicar no botão
    });
});
