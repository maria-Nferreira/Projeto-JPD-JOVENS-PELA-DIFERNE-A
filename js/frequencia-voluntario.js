document.addEventListener('DOMContentLoaded', function() {
    let botaoBuscarUsuarios = document.querySelector('.botao-buscar-usuarios');
    botaoBuscarUsuarios.addEventListener('click', buscarUsuarios);
    let botaoPesquisar = document.querySelector('.botao-pesquisar');
    botaoPesquisar.addEventListener('click', pesquisarUsuarios);
    let entradaPesquisa = document.getElementById('entrada-pesquisa');
    let listaUsuarios = document.getElementById('lista-usuarios');
    let usuarios = [];
    async function buscarUsuarios() {
        try {
            let resposta = await fetch('https://jsonplaceholder.typicode.com/users'); // Substitua pelo endpoint da sua API
            if (!resposta.ok) {
                throw new Error('Erro na resposta da rede: ' + resposta.statusText);
            }
            let dados = await resposta.json();
            if (Array.isArray(dados)) {
                usuarios = dados;
                exibirUsuarios(usuarios);
            } else {
                throw new Error('Formato de dados inesperado: Não é um array');
            }
        } catch (erro) {
            console.error('Erro ao buscar os dados: ', erro);
        }
    }

    function pesquisarUsuarios() {
        let termoPesquisa = entradaPesquisa.value.toLowerCase();
        let usuariosFiltrados = usuarios.filter(usuario => usuario.name.toLowerCase().includes(termoPesquisa));
        if (usuariosFiltrados.length === 0) {
            alert('Nenhum usuário encontrado com esse nome.');
        }
        exibirUsuarios(usuariosFiltrados);
    }

    function exibirUsuarios(usuarios) {
        listaUsuarios.innerHTML = '';
        usuarios.forEach(usuario => {
            let linhaUsuario = criarLinhaUsuario(usuario);
            listaUsuarios.appendChild(linhaUsuario);
        });
    }

    function criarLinhaUsuario(usuario) {
        let tr = document.createElement('tr');
        
        let nomeTd = document.createElement('td');
        nomeTd.textContent = usuario.name;
        tr.appendChild(nomeTd);
        
        let equipeTd = document.createElement('td');
        equipeTd.textContent = usuario.company.name;
        tr.appendChild(equipeTd);

        let frequenciaTd = document.createElement('td');
        let select = document.createElement('select');
        select.className = 'frequencia select-formatacao';
        select.innerHTML = `
            <option value="" selected>Selecione</option>
            <option value="ok">OK</option>
            <option value="1_atraso">*</option>
            <option value="2_atrasos">**</option>
            <option value="falta">Falta</option>
        `;
        frequenciaTd.appendChild(select);
        tr.appendChild(frequenciaTd);

        let acoesTd = document.createElement('td');
        let botaoSalvar = document.createElement('button');
        botaoSalvar.className = 'botao-salvar';
        botaoSalvar.innerHTML = `<i class="fa-solid fa-floppy-disk"></i>`;
        botaoSalvar.addEventListener('click', () => {
            let frequenciaSelecionada = select.value;
            if (frequenciaSelecionada) {
                salvarFrequencia(usuario.id, frequenciaSelecionada);
            } else {
                alert('Por favor, selecione uma frequência.');
            }
        });
        acoesTd.appendChild(botaoSalvar);

        let botaoVisualizar = document.createElement('button');
        botaoVisualizar.className = 'botao-visualizar';
        botaoVisualizar.innerHTML = `<i class="fa-solid fa-eye"></i>`;
        acoesTd.appendChild(botaoVisualizar);

        tr.appendChild(acoesTd);

        return tr;
    }

    function salvarFrequencia(idUsuario, frequencia) {
        // Implemente a lógica para salvar a frequência do usuário aqui.
        // Pode ser um envio para uma API ou armazenamento local.
        // Exemplo de envio para uma API (substitua pelo seu endpoint):
        fetch(`https://example.com/api/usuarios/${idUsuario}/frequencia`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ frequencia: frequencia })
        })
        .then(resposta => {
            if (!resposta.ok) {
                throw new Error('Erro ao salvar a frequência: ' + resposta.statusText);
            }
            return resposta.json();
        })
        .then(dados => {
            alert('Frequência salva com sucesso!');
        })
        .catch(erro => {
            console.error('Erro ao salvar a frequência: ', erro);
        });
    }
});
