let arrayVoluntario = [];
let arrayVoluntarioFiltrado = [];
let arrayAcoes = [
    { id: 1, nome: 'Ação 1' },
    { id: 2, nome: 'Ação 2' },
    { id: 3, nome: 'Ação 3' }
];
let nomeAcaoSelecionada = '';

async function buscarDadosVoluntarios() {
    try {
        const response = await fetch('https://reqres.in/api/users?page=1');
        const dados = await response.json();

        if (Array.isArray(dados.data)) {
            arrayVoluntario = dados.data.map(voluntario => ({
                id: voluntario.id,
                nome: `${voluntario.first_name} ${voluntario.last_name}`,
                email: voluntario.email,
                equipe: 'Equipe A', // Adicionando um valor fixo para a equipe, pois não há essa informação na API
                frequenciaVoluntario: ''
            }));
            arrayVoluntarioFiltrado = arrayVoluntario;
        } else {
            console.error('Os dados recebidos não são um array:', dados);
        }
        
        renderizarListaVoluntarios();
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

function preencherDropdownAcoes() {
    let dropdownMenuList = document.getElementById("dropdown-menu-list");
    dropdownMenuList.innerHTML = "";

    arrayAcoes.forEach(acao => {
        let listItem = document.createElement("li");
        let linkItem = document.createElement("a");
        linkItem.classList.add("dropdown-item");
        linkItem.href = "#";
        linkItem.textContent = acao.nome;
        linkItem.addEventListener("click", () => selecionarAcao(acao.nome, acao.id));
        listItem.appendChild(linkItem);
        dropdownMenuList.appendChild(listItem);
    });
}

function renderizarListaVoluntarios() {
    let listaUsuarios = document.getElementById("lista-usuarios");
    listaUsuarios.innerHTML = "";

    arrayVoluntarioFiltrado.forEach(voluntario => {
        let row = document.createElement("tr");

        let nomeCell = document.createElement("td");
        nomeCell.textContent = voluntario.nome;
        nomeCell.classList.add("name-cell");
        row.appendChild(nomeCell);

        let equipeCell = document.createElement("td");
        equipeCell.textContent = voluntario.equipe;
        row.appendChild(equipeCell);

        let emailCell = document.createElement("td");
        emailCell.textContent = voluntario.email;
        row.appendChild(emailCell);

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

        let acoesCell = document.createElement("td");
        let botaoSalvar = document.createElement("button");
        botaoSalvar.textContent = "Salvar";
        botaoSalvar.classList.add("btn", "btn-primary");
        botaoSalvar.addEventListener("click", () => salvarVoluntario(voluntario.id));
        acoesCell.appendChild(botaoSalvar);
        row.appendChild(acoesCell);

        listaUsuarios.appendChild(row);
    });
}

function atualizarFrequencia(id, frequencia) {
    let voluntario = arrayVoluntario.find(v => v.id === id);
    if (voluntario) {
        voluntario.frequenciaVoluntario = frequencia;
    }
}

async function salvarVoluntario(id) {
    let voluntario = arrayVoluntario.find(v => v.id === id);
    if (voluntario) {
        try {
            const dadosParaSalvar = { ...voluntario, nomeAcao: nomeAcaoSelecionada };
            console.log('Dados enviados:', dadosParaSalvar);
            let response = await fetch(`https://reqres.in/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosParaSalvar)
            });

            if (!response.ok) {
                throw new Error('Erro ao salvar dados');
            }
            console.log(arrayVoluntario);
            alert('Dados salvos com sucesso!');

        } catch (error) {
            console.error('Erro ao salvar dados:', error);
            alert('Erro ao salvar dados.');
        }
    }
}

function selecionarAcao(nomeAcao, idAcao) {
    let spanNomeAcao = document.getElementById("nome-acao");
    spanNomeAcao.textContent = nomeAcao;
    nomeAcaoSelecionada = nomeAcao;
    buscarVoluntariosPorAcao(idAcao);
}

function buscarVoluntariosPorAcao(idAcao) {
    // Filtrando voluntários por uma ação específica (exemplo fictício)
    arrayVoluntarioFiltrado = arrayVoluntario.filter(voluntario => voluntario.equipe === 'Equipe A');
    renderizarListaVoluntarios();
}

document.addEventListener("DOMContentLoaded", () => {
    preencherDropdownAcoes();
    buscarDadosVoluntarios();
});
