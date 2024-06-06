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
            let resposta = await fetch('https://reqres.in/api/users?page=2');
            if (!resposta.ok) {
                throw new Error('Erro na resposta da rede: ' + resposta.statusText);
            }
            let dados = await resposta.json();
            console.log(dados); // Adiciona um console.log para verificar o formato dos dados
            if (Array.isArray(dados.data)) {
                usuarios = dados.data;
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
        let usuariosFiltrados = usuarios.filter(usuario => {
            let nomeCompleto = `${usuario.first_name} ${usuario.last_name}`.toLowerCase();
            return nomeCompleto.includes(termoPesquisa);
        });
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
        nomeTd.textContent = `${usuario.first_name} ${usuario.last_name}`;
        tr.appendChild(nomeTd);
        
        let emailTd = document.createElement('td');
        emailTd.textContent = usuario.email;
        tr.appendChild(emailTd);
        
        let equipeTd = document.createElement('td');
        equipeTd.textContent = usuario.equipe ? usuario.equipe : 'Sem dados';
        tr.appendChild(equipeTd);

        let acoesTd = document.createElement('td');
        
        let botaoEditar = document.createElement('button');
        botaoEditar.className = 'botao-editar';
        botaoEditar.innerHTML = `<i class="fas fa-pencil-alt"></i>`; // Ícone de edição
        botaoEditar.addEventListener('click', () => {
            editarUsuario(usuario.id);
        });
        acoesTd.appendChild(botaoEditar);

        let botaoDeletar = document.createElement('button');
        botaoDeletar.className = 'botao-deletar';
        botaoDeletar.innerHTML = `<i class="fas fa-trash"></i>`; // Ícone de exclusão
        botaoDeletar.addEventListener('click', () => {
            deletarUsuario(usuario.id);
        });
        acoesTd.appendChild(botaoDeletar);

        tr.appendChild(acoesTd);

        return tr;
    }

    async function editarUsuario(id) {
        window.location.href = `editar_cadastro.html?id=${id}`;
    }

    async function deletarUsuario(id) {
        try {
            let resposta = await fetch(`https://reqres.in/api/users/2${id}`, {
                method: 'DELETE'
            });
            if (!resposta.ok) {
                throw new Error('Erro na resposta da rede: ' + resposta.statusText);
            }
            alert('Usuário excluído com sucesso.');
            // Remova o usuário da lista
            usuarios = usuarios.filter(usuario => usuario.id !== id);
            exibirUsuarios(usuarios);
        } catch (erro) {
            console.error('Erro ao excluir o usuário: ', erro);
            alert('Erro ao excluir o usuário.');
        }
    }

    // Evento de clique para o botão de busca de usuários
    botaoBuscarUsuarios.addEventListener('click', buscarUsuarios);

    // Evento de clique para o botão de pesquisa
    botaoPesquisar.addEventListener('click', pesquisarUsuarios);

    // Função para preencher os campos do formulário de edição com os dados do usuário
    async function preencherFormulario(usuario) {
        document.getElementById('campo-nome').value = `${usuario.first_name} ${usuario.last_name}`;
        document.getElementById('campo-email').value = usuario.email;
        document.getElementById('campo-equipe').value = usuario.equipe || '';
    }

    // Função para carregar os dados do usuário ao abrir a página de edição
    async function carregarUsuario(id) {
        try {
            let resposta = await fetch(`https://reqres.in/api/users?page=2${id}`);
            if (!resposta.ok) {
                throw new Error('Erro na resposta da rede: ' + resposta.statusText);
            }
            let usuario = await resposta.json();
            preencherFormulario(usuario);
        } catch (erro) {
            console.error('Erro ao carregar os dados do usuário: ', erro);
        }
    }

    // Verifica se há um ID de usuário na URL e carrega seus dados
    if (userId) {
        carregarUsuario(userId);
    }
});
