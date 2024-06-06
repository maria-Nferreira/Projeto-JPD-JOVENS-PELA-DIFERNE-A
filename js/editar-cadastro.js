document.addEventListener('DOMContentLoaded', async function() {
    // Obtém o parâmetro ID da URL
    const urlParams = new URLSearchParams(window.location.search);
    const usuarioId = urlParams.get('id');

    if (usuarioId) {
        try {
            // Faz uma requisição para obter os dados do usuário pelo ID
            let resposta = await fetch(`https://reqres.in/api/users?page=2${usuarioId}`); // Substitua pelo endpoint da sua API
            if (!resposta.ok) {
                throw new Error('Erro na resposta da rede: ' + resposta.statusText);
            }
            let usuario = await resposta.json();
            // Preenche os campos do formulário com os dados do usuário
            document.getElementById('campo-nome').value = usuario.name || '';
            document.getElementById('campo-email').value = usuario.email || '';
            document.getElementById('campo-telefone-principal').value = usuario.phone || '';
            document.getElementById('campo-data-nascimento').value = usuario.data_nascimento || '';
            document.getElementById('campo-nome-social').value = usuario.nome_social || '';
            document.getElementById('campo-genero').value = usuario.genero || '';
            document.getElementById('campo-pronome').value = usuario.pronome || '';
            document.getElementById('campo-telefone-emergencial').value = usuario.telefone_emergencia || '';
            document.getElementById('campo-data-ingressao').value = usuario.data_ingressao || '';
            document.getElementById('campo-equipe').value = usuario.equipe || '';
            document.getElementById('campo-numero-acoes').value = usuario.numero_acoes || '';
            document.getElementById('campo-membro-sim').checked = usuario.membro_setor === 'sim';
            document.getElementById('campo-membro-nao').checked = usuario.membro_setor === 'nao';
            document.getElementById('campo-coordenador-sim').checked = usuario.coordenador === 'sim';
            document.getElementById('campo-coordenador-nao').checked = usuario.coordenador === 'nao';
            document.getElementById('campo-setor').value = usuario.setor || '';
            document.getElementById('campo-coordenador-setor').value = usuario.coordenador_funcao || '';
        } catch (erro) {
                console.error('Erro ao buscar os dados: ', erro);
        }
    }
});

// Função para enviar os dados do formulário ao clicar no botão "Atualizar"
async function editarVoluntario(event) {
    event.preventDefault(); // Impede o envio do formulário por padrão

    // Obtém o parâmetro ID da URL
    const urlParams = new URLSearchParams(window.location.search);
    const usuarioId = urlParams.get('id');

    // Coleta os dados do formulário
    const formData = {
        nome_voluntario: document.getElementById('campo-nome').value,
        nome_voluntario_social: document.getElementById('campo-nome-social').value,
        genero: document.getElementById('campo-genero').value,
        pronome: document.getElementById('campo-pronome').value,
        data_nascimento: document.getElementById('campo-data-nascimento').value,
        email_voluntario: document.getElementById('campo-email').value,
        telefone_principal: document.getElementById('campo-telefone-principal').value,
        telefone_emergencia: document.getElementById('campo-telefone-emergencial').value,
        data_ingressao: document.getElementById('campo-data-ingressao').value,
        equipe: document.getElementById('campo-equipe').value,
        numero_acoes: document.getElementById('campo-numero-acoes').value,
        membro_setor: document.querySelector('input[name="membro_setor"]:checked').value,
        coordenador: document.querySelector('input[name="coordenador"]:checked').value,
        setor: document.getElementById('campo-setor').value,
        coordenador_funcao: document.getElementById('campo-coordenador-setor').value
    };

    try {
        // Envia os dados para a API
        let resposta = await fetch(`https://reqres.in/api/users/${usuarioId}`, {
            method: 'PUT', // ou 'POST' se for um novo recurso
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!resposta.ok) {
            throw new Error('Erro na resposta da rede: ' + resposta.statusText);
        }

        let resultado = await resposta.json();
        console.log('Dados atualizados com sucesso:', resultado);

        // Aqui você pode adicionar qualquer ação após o sucesso, como redirecionar o usuário ou mostrar uma mensagem de sucesso

    } catch (erro) {
        console.error('Erro ao enviar os dados:', erro);
    }
}

// Adiciona o evento de clique ao botão "Atualizar"
document.getElementById('editar').addEventListener('click', editarVoluntario);
