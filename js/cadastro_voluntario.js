
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.mb-5');
  
    loginForm.addEventListener('submit', async function(event) {
      event.preventDefault();
  
      //colocar as variaveis
  
      try {
        const response = await fetch('https://008f-2804-214-869c-7d66-ed16-2fbe-41d5-f6c7.ngrok-free.app/api/usuario', {
          mode: 'cors',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: "João Pedro Santos",
            email:"email32@email.com",
            password:"senha@123",
            socialName: "Zê",
            dateBirth: "10/05/1999",
            tel: "(85) 9 9090-0909"
          })
        });
  
        let data = await response;
        
        if (!response.ok) {
          throw new Error(data.message || 'Erro no login.');
        }else{
          console.log(data)
  
        }
  
        console.log('voluntario cadastrado:', data);
  
  
        // Lógica para redirecionar o usuário ou exibir uma mensagem de sucesso
  
      } catch (error) {
        
        // Exibir mensagem de erro genérica
        displayError(emailError, 'Dados incorretos! Por favor, verifique os dados corretamente.');
      }
    });
  
  })

/*class Voluntario {
    constructor() {
        this.id = 1;
        this.arrayVoluntarios = []; // lista de voluntários
        this.editId = null;
        this.vincularEventoAtualizar();
    }

    async cadastrar() {
        
        if (this.editId !== null) {
            return; // Se estiver no modo de edição, não cadastra
        }
        let voluntario = this.ler_dados(); // guardando os valores dos campos dentro dessa variável

        // chamando a função validação
        if (this.validacao(voluntario)) {
            if (this.editId === null) {
                voluntario.id = this.id; // Atribuir um novo ID apenas para novos cadastros
                this.adicionar(voluntario);
                this.id++;
                await this.enviarDadosServidor(voluntario); // Envia os dados para o servidor
            } else {
                await this.atualizar(this.editId, voluntario);
            }
        }

        this.lista_tabela();
        this.limpar_dados();
    }

    ler_dados() {
        let voluntario = {}; // criando o objeto

        // criar variáveis para obter os valores selecionados dos selects
        let genero_selecionado = document.getElementById('campo-genero');
        let pronome_selecionado = document.getElementById('campo-pronome');
        let equipe_selecionada = document.getElementById('campo-equipe');
        let setor = document.getElementById('campo-setor');
        let coordenadorSetor = document.getElementById('campo-coordenador-setor');

        // criar variáveis para obter os valores dos inputs radio
        let simSetor = document.getElementById('campo-membro-sim');
        let naoSetor = document.getElementById('campo-membro-nao');
        let simCoordenador = document.getElementById('campo-coordenador-sim');
        let naoCoordenador = document.getElementById('campo-coordenador-nao');

        // adicionar os métodos com os valores no objeto voluntario
        if (this.editId !== null) {
            voluntario.id = this.editId; // Manter o ID original se estivermos editando
        }

        voluntario.nomeVoluntario = document.getElementById('campo-nome').value;
        voluntario.nomeSocial = document.getElementById('campo-nome-social').value;
        voluntario.genero = genero_selecionado.value;
        voluntario.pronome = pronome_selecionado.value;
        voluntario.equipe = equipe_selecionada.value;
        voluntario.dataNascimento = document.getElementById('campo-data-nascimento').value;
        voluntario.emailVoluntario = document.getElementById('campo-email').value;
        voluntario.telefonePrincipal = document.getElementById('campo-telefone-principal').value;
        voluntario.telefoneEmergencial = document.getElementById('campo-telefone-emergencial').value;
        voluntario.dataIngressao = document.getElementById('campo-data-ingressao').value;
        voluntario.numAcoes = document.getElementById('campo-numero-acoes').value;

        // checando a opção marcada no campo setor
        if (simSetor.checked) {
            voluntario.membroSetor = simSetor.value;
        } else if (naoSetor.checked) {
            voluntario.membroSetor = naoSetor.value;
        }
        voluntario.qualSetor = setor.value;

        // checando a opção marcada no campo coordenador
        if (simCoordenador.checked) {
            voluntario.coordenador = simCoordenador.value;
        } else if (naoCoordenador.checked) {
            voluntario.coordenador = naoCoordenador.value;
        }
        voluntario.coordenadorSetor = coordenadorSetor.value;

        return voluntario;
    }

    adicionar(voluntario) {
        this.arrayVoluntarios.push(voluntario); // adicionar os campos da lista de voluntario dentro do array
    }
    
    async enviarDadosServidor(voluntario) {
        const url = 'https://008f-2804-214-869c-7d66-ed16-2fbe-41d5-f6c7.ngrok-free.app'; // Substitua pela sua URL de endpoint

        const options = {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: "{'name': 'João Pedro Santos','email':'email332@email.com','password':'senha@123','socialName': 'Zê','dateBirth': '10/05/1999','tel': '(85) 9 9090-0909'}"
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('Erro ao enviar requisição.');
            }
            const data = await response.json();
            console.log('Voluntário cadastrado com sucesso:', data);
        } catch (error) {
            console.error('Erro ao cadastrar voluntário:', error);
        }
    }

    lista_tabela() {
        let espaco_tabela = document.getElementById('espaco-tabela');
        espaco_tabela.classList.add('aparecer');

        let tabela = document.getElementById('tabela_voluntario');
        tabela.innerHTML = '';

        for (let i = 0; i < this.arrayVoluntarios.length; i++) {
            let tr = tabela.insertRow();

            let td_nomeCompleto = tr.insertCell();
            let td_nomeSocial = tr.insertCell();
            let td_genero = tr.insertCell();
            let td_pronome = tr.insertCell();
            let td_dataNascimento = tr.insertCell();
            let td_email = tr.insertCell();
            let td_telefonePrincipal = tr.insertCell();
            let td_telefoneEmergencial = tr.insertCell();
            let td_dataIngressao = tr.insertCell();
            let td_equipe = tr.insertCell();
            let td_numAcoes = tr.insertCell();
            let td_membroSetor = tr.insertCell();
            let td_qualSetor = tr.insertCell();
            let td_coordenador = tr.insertCell();
            let td_coordenadorSetor = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_nomeCompleto.innerText = this.arrayVoluntarios[i].nomeVoluntario;
            td_nomeSocial.innerText = this.arrayVoluntarios[i].nomeSocial;
            td_genero.innerText = this.arrayVoluntarios[i].genero;
            td_pronome.innerText = this.arrayVoluntarios[i].pronome;
            td_dataNascimento.innerText = this.arrayVoluntarios[i].dataNascimento;
            td_email.innerText = this.arrayVoluntarios[i].emailVoluntario;
            td_telefonePrincipal.innerText = this.arrayVoluntarios[i].telefonePrincipal;
            td_telefoneEmergencial.innerText = this.arrayVoluntarios[i].telefoneEmergencial;
            td_dataIngressao.innerText = this.arrayVoluntarios[i].dataIngressao;
            td_equipe.innerText = this.arrayVoluntarios[i].equipe;
            td_numAcoes.innerText = this.arrayVoluntarios[i].numAcoes;
            td_membroSetor.innerText = this.arrayVoluntarios[i].membroSetor;
            td_qualSetor.innerText = this.arrayVoluntarios[i].qualSetor;
            td_coordenador.innerText = this.arrayVoluntarios[i].coordenador;
            td_coordenadorSetor.innerText = this.arrayVoluntarios[i].coordenadorSetor;

            let imgEdit = document.createElement('img');
            let imgDelete = document.createElement('img');

            imgEdit.src = 'imagens/editar.png';
            imgDelete.src = 'imagens/delete.png';

            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDelete);

            imgEdit.classList.add('img-acoes');
            imgDelete.classList.add('img-acoes');

            imgEdit.setAttribute("onclick", "voluntario.editar(" + JSON.stringify(this.arrayVoluntarios[i]) + ")");
            imgDelete.setAttribute("onclick", "voluntario.deletar(" + this.arrayVoluntarios[i].id + ")");
        }
    }

    editar(dados) {
        this.editId = dados.id;

        document.getElementById('campo-nome').value = dados.nomeVoluntario;
        document.getElementById('campo-nome-social').value = dados.nomeSocial;
        document.getElementById('campo-genero').value = dados.genero;
        document.getElementById('campo-pronome').value = dados.pronome;
        document.getElementById('campo-data-nascimento').value = dados.dataNascimento;
        document.getElementById('campo-email').value = dados.emailVoluntario;
        document.getElementById('campo-telefone-principal').value = dados.telefonePrincipal;
        document.getElementById('campo-telefone-emergencial').value = dados.telefoneEmergencial;
        document.getElementById('campo-data-ingressao').value = dados.dataIngressao;
        document.getElementById('campo-equipe').value = dados.equipe;
        document.getElementById('campo-numero-acoes').value = dados.numAcoes;

        if (dados.membroSetor === 'sim') {
            document.getElementById('campo-membro-sim').checked = true;
        } else if (dados.membroSetor === 'nao') {
            document.getElementById('campo-membro-nao').checked = true;
        }
        document.getElementById('campo-setor').value = dados.qualSetor;

        if (dados.coordenador === 'sim') {
            document.getElementById('campo-coordenador-sim').checked = true;
        } else if (dados.coordenador === 'nao') {
            document.getElementById('campo-coordenador-nao').checked = true;
        }
        document.getElementById('campo-coordenador-setor').value = dados.coordenadorSetor;

        document.getElementById('editar').innerHTML = 'Atualizar';
    }

    async atualizar(id, voluntario) {
        try {
            const url = `https://reqres.in/api/users/${id}`; // Substitua pela sua URL de endpoint

            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(voluntario)
            };

            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('Erro ao enviar requisição.');
            }
            const data = await response.json();
            console.log('Voluntário atualizado com sucesso:', data);

            // Atualizar o array com os dados modificados
            for (let i = 0; i < this.arrayVoluntarios.length; i++) {
                if (this.arrayVoluntarios[i].id === id) {
                    this.arrayVoluntarios[i] = voluntario;
                    break;
                }
            }

            // Atualizar a tabela
            this.lista_tabela();
        } catch (error) {
            console.error('Erro ao atualizar voluntário:', error);
        }
    }

    async deletar(id) {
        if (confirm('Deseja realmente deletar o voluntário?')) {
            let tabela = document.getElementById('tabela_voluntario');
            for (let i = 0; i < this.arrayVoluntarios.length; i++) {
                if (this.arrayVoluntarios[i].id == id) {
                    try {
                        const url = `https://reqres.in/api/users/${id}`; // Substitua pela sua URL de endpoint

                        const options = {
                            method: 'DELETE'
                        };

                        const response = await fetch(url, options);
                        if (!response.ok) {
                            throw new Error('Erro ao enviar requisição.');
                        }
                        this.arrayVoluntarios.splice(i, 1);
                        tabela.deleteRow(i);
                        console.log('Voluntário deletado com sucesso.');
                    } catch (error) {
                        console.error('Erro ao deletar voluntário:', error);
                    }
                    break;
                }
            }
        }
    }

    validacao(voluntario) {
        let mensagem = '';
        if (voluntario.nomeVoluntario === '') {
            mensagem += 'Informe o nome completo \n';
        }
        if (voluntario.dataNascimento === '') {
            mensagem += 'Informe a data de nascimento\n';
        }
        if (voluntario.emailVoluntario === '') {
            mensagem += 'Informe o email\n';
        }
        if (voluntario.telefonePrincipal === '') {
            mensagem += 'Informe o telefone principal\n';
        }
        if (voluntario.telefoneEmergencial === '') {
            mensagem += 'Informe o telefone de emergência\n';
        }
        if (voluntario.dataIngressao === '') {
            mensagem += 'Informe a data de ingresso\n';
        }
        if (voluntario.numAcoes === '') {
            mensagem += 'Informe o número de ações\n';
        }

        if (mensagem !== '') {
            alert(mensagem);
            return false;
        }
        return true;
    }

    limpar_dados() {
        document.getElementById('campo-nome').value = '';
        document.getElementById('campo-nome-social').value = '';
        document.getElementById('campo-email').value = '';
        document.getElementById('campo-telefone-principal').value = '';
        document.getElementById('campo-telefone-emergencial').value = '';
        document.getElementById('campo-data-nascimento').value = '';
        document.getElementById('campo-data-ingressao').value = '';
        document.getElementById('campo-numero-acoes').value = '';
        document.getElementById('campo-genero').value = '';
        document.getElementById('campo-pronome').value = '';
        document.getElementById('campo-equipe').value = '';
        document.getElementById('campo-setor').value = '';
        document.getElementById('campo-coordenador-setor').value = '';
        document.getElementById('campo-membro-sim').checked = false;
        document.getElementById('campo-membro-nao').checked = false;
        document.getElementById('campo-coordenador-sim').checked = false;
        document.getElementById('campo-coordenador-nao').checked = false;

        document.getElementById('editar').innerHTML = 'Cadastrar';
        this.editId = null;
    }

    atualizarVoluntario() {
        let voluntario = this.ler_dados(); // Ler os dados do formulário de edição

        if (this.validacao(voluntario)) {
            if (this.editId !== null) {
                this.atualizar(this.editId, voluntario);
            }

            this.limpar_dados();
            this.lista_tabela();
        }
    }

    vincularEventoAtualizar() {
        document.getElementById('editar').addEventListener('click', () => {
            this.atualizarVoluntario();
        });
    }
}

let voluntario = new Voluntario();


*/


