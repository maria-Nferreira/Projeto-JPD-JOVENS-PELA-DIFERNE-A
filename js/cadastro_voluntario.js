

class Voluntario {
    constructor(){
        this.id = 1
        this.arrayVoluntarios = [] //lista de voluntários
        this.editId = null
    }

    //Cadastrar
    cadastrar(){
        let voluntario = this.ler_dados()//guardando os valores dos campos dentro dessa variável

        //chamando a função validação
        if(this.validacao(voluntario) == true){
            if(this.editId == null){
                this.adicionar(voluntario)
            }else {
                this.atualizar(this.editId, voluntario)
            }
            
        }
        
        this.lista_tabela()
        this.limpar_dados()
        
    }


    //FUNÇÃO LER DADOS
    ler_dados(){
        let voluntario = {} //criando o objeto

        //criando variáveis para obter os valores selecionados dos selects
        let genero_selecionado = document.getElementById('campo-genero')
        let pronome_selecionado = document.getElementById('campo-pronome')
        let equipe_selecionada = document.getElementById('campo-equipe')
        let setor = document.getElementById('campo-setor')
        let coordenadorSetor = document.getElementById('campo-coordenador-setor')


        //criando variáveis para obter os valores dos inputs radio
        let simSetor = document.getElementById('campo-membro-sim')
        let naoSetor = document.getElementById('campo-membro-nao')
        let simCoordenador = document.getElementById('campo-coordenador-sim')
        let naoCoordenador = document.getElementById('campo-coordenador-nao')

        //adicionando os metodos com os valores no objeto voluntario
        voluntario.id = this.id
        voluntario.nomeVoluntario = document.getElementById('campo-nome').value
        voluntario.nomeSocial = document.getElementById('campo-nome-social').value
        voluntario.genero = genero_selecionado.value
        voluntario.pronome = pronome_selecionado.value
        voluntario.equipe = equipe_selecionada.value
        voluntario.dataNascimento = document.getElementById('campo-data-nascimento').value
        voluntario.emailVoluntario = document.getElementById('campo-email').value
        voluntario.telefonePrincipal = document.getElementById('campo-telefone-principal').value
        voluntario.telefoneEmergencial = document.getElementById('campo-telefone-emergencial').value
        voluntario.dataIngressao = document.getElementById('campo-data-ingressao').value
        voluntario.numAcoes = document.getElementById('campo-numero-acoes').value
        
        //checando a opção marcada no campo setor
        if(simSetor.checked){
            voluntario.membroSetor = simSetor.value
        } else if(naoSetor.checked){
            voluntario.membroSetor = naoSetor.value
        }
        voluntario.qualSetor = setor.value


        //checando a opção marcada no campo coordenador
        if(simCoordenador.checked){
            voluntario.coordenador = simCoordenador.value
        } else if(naoCoordenador.checked){
            voluntario.coordenador = naoCoordenador.value
        }
        voluntario.coordenadorSetor = coordenadorSetor.value

        return voluntario
    }
    



    //FUNÇÃO ADICIONAR 
    adicionar(voluntario){
        this.arrayVoluntarios.push(voluntario)//adicionar os campos da lista de voluntario dentro do array
    
        this.id++//encrementando o ID conforme for adionando um novo cadastro
        
        
    }


    //FUNÇÃO TABELA
    lista_tabela(){
        let espaco_tabela = document.getElementById('espaco-tabela')
        espaco_tabela.classList.add('aparecer')

        let tabela = document.getElementById('tabela_voluntario')
        tabela.innerHTML = ''

        //listanto os itens dos arrays
        for(let i = 0; i < this.arrayVoluntarios.length; i++){
            //criando linha da tabela
            let tr = tabela.insertRow()

            //criando as colunas da tabela
            let td_nomeCompleto = tr.insertCell()
            let td_nomeSocial = tr.insertCell()
            let td_genero = tr.insertCell()
            let td_pronome = tr.insertCell()
            let td_dataNascimento = tr.insertCell()
            let td_email = tr.insertCell()
            let td_telefonePrincipal = tr.insertCell()
            let td_telefoneEmergencial = tr.insertCell()
            let td_dataIngressao = tr.insertCell()
            let td_equipe = tr.insertCell()
            let td_numAcoes = tr.insertCell()
            let td_membroSetor = tr.insertCell()
            let td_qualSetor = tr.insertCell()
            let td_coordenador = tr.insertCell()
            let td_coordenadorSetor = tr.insertCell()
            let td_acoes = tr.insertCell()

            //adicionando os dados dentro da tabela
            td_nomeCompleto.innerText = this.arrayVoluntarios[i].nomeVoluntario
            td_nomeSocial.innerText = this.arrayVoluntarios[i].nomeSocial
            td_genero.innerText = this.arrayVoluntarios[i].genero
            td_pronome.innerText = this.arrayVoluntarios[i].pronome
            td_dataNascimento.innerText = this.arrayVoluntarios[i].dataNascimento
            td_email.innerText = this.arrayVoluntarios[i].emailVoluntario
            td_telefonePrincipal.innerText = this.arrayVoluntarios[i].telefonePrincipal
            td_telefoneEmergencial.innerText = this.arrayVoluntarios[i].telefoneEmergencial
            td_dataIngressao.innerText = this.arrayVoluntarios[i].dataIngressao
            td_equipe.innerText = this.arrayVoluntarios[i].equipe
            td_numAcoes.innerText = this.arrayVoluntarios[i].numAcoes
            td_membroSetor.innerText = this.arrayVoluntarios[i].membroSetor
            td_qualSetor.innerText = this.arrayVoluntarios[i].qualSetor
            td_coordenador.innerText = this.arrayVoluntarios[i].coordenador
            td_coordenadorSetor.innerText = this.arrayVoluntarios[i].coordenadorSetor

            //criando os botões edit e deletar
            let imgEdit = document.createElement('img')//criando a imagem edit
            let imgDelete = document.createElement('img')//criando a imagem delete

            ////caminho que está localizado a imagem
            imgEdit.src =  'imagens/editar.png'
            imgDelete.src = 'imagens/delete.png'

            //adcionando na coluna a imagem do botão
            td_acoes.appendChild(imgEdit)
            td_acoes.appendChild(imgDelete)

            //adicionando a classe nas imagens
            imgEdit.classList.add('img-acoes')
            imgDelete.classList.add('img-acoes')

            //atrinuindo a função deletar na imagem delete de acordo com o ID
            imgDelete.setAttribute("onclick", "voluntario.deletar("+ this.arrayVoluntarios[i].id + ")")

            imgEdit.setAttribute("onclick", "voluntario.editar("+ JSON.stringify(this.arrayVoluntarios[i]) + ")")
            console.log(this.arrayVoluntarios)
        }
    }


    //FUNÇÃO EDITAR
    editar(dados){
        this.editId = dados.id

        document.getElementById('campo-nome').value = dados.nomeVoluntario
        document.getElementById('campo-nome-social').value = dados.nomeSocial
        document.getElementById('campo-genero').value = dados.genero
        document.getElementById('campo-pronome').value = dados.pronome
        document.getElementById('campo-data-nascimento').value = dados.dataNascimento
        document.getElementById('campo-email').value = dados.emailVoluntario
        document.getElementById('campo-telefone-principal').value = dados.telefonePrincipal
        document.getElementById('campo-telefone-emergencial').value = dados.telefoneEmergencial
        document.getElementById('campo-data-ingressao').value = dados.dataIngressao
        document.getElementById('campo-equipe').value = dados.equipe
        document.getElementById('campo-numero-acoes').valaue = dados.numAcoes
        if(document.getElementById('campo-membro-sim').checked){
            document.getElementById('campo-membro-sim').value = dados.membroSetor
        } else if(document.getElementById('campo-membro-nao').checked){
            document.getElementById('campo-membro-nao').value = dados.membroSetor
        }
        document.getElementById('campo-setor').value = dados.qualSetor

        if(document.getElementById('campo-coordenador-sim').checked){
            document.getElementById('campo-coordenador-sim').value = dados.coordenador
        } else if(document.getElementById('campo-coordenador-nao').checked){
            document.getElementById('campo-coordenador-nao').value = dados.coordenador
        }
        document.getElementById('campo-coordenador-setor').value = dados.coordenadorSetor

        //mudando o nome o botao cadastrar para atualizar 
        document.getElementById('editar').innerHTML = 'Atualizar'
    }

        
    atualizar(id, voluntario){
        for(let i = 0; i < this.arrayVoluntarios.length;i++){
            if(this.arrayVoluntarios[i].id == id){
                this.arrayVoluntarios[i].nomeVoluntario = voluntario.nomeVoluntario
                this.arrayVoluntarios[i].nomeSocial = voluntario.nomeSocial
                this.arrayVoluntarios[i].genero = voluntario.genero
                this.arrayVoluntarios[i].pronome = voluntario.pronome
                this.arrayVoluntarios[i].dataNascimento = voluntario.dataNascimento
                this.arrayVoluntarios[i].emailVoluntario = voluntario.emailVoluntario
                this.arrayVoluntarios[i].telefonePrincipal = voluntario.telefonePrincipal
                this.arrayVoluntarios[i].telefoneEmergencial = voluntario.telefoneEmergencial
                this.arrayVoluntarios[i].dataIngressao = voluntario.dataIngressao
                this.arrayVoluntarios[i].equipe = voluntario.equipe
                this.arrayVoluntarios[i].numAcoes = voluntario.numAcoes
                this.arrayVoluntarios[i].membroSetor = voluntario.membroSetor
                this.arrayVoluntarios[i].qualSetor = voluntario.qualSetor
                this.arrayVoluntarios[i].coordenador = voluntario.coordenador
                this.arrayVoluntarios[i].coordenadorSetor = voluntario.coordenadorSetor
            }
        }
    }

    //FUNÇÃO DELETAR
    deletar(id){
        if(confirm('Deseja realmente deletar o voluntário')){
            let tabela = document.getElementById('tabela_voluntario')
            for(let i = 0; i < this.arrayVoluntarios.length; i ++){
            if(this.arrayVoluntarios[i].id == id){
                this.arrayVoluntarios.splice(i, 1)
                tabela.deleteRow(i)
            }
        }
        console.log(this.arrayVoluntarios)
        }
        
    }
    
    //validação os campos
    validacao(voluntario){
        let mensagem = ''
        if(voluntario.nomeVoluntario == ''){
            mensagem += 'informe o nome completo \n'
            
        }
        if(voluntario.dataNascimento ==''){
            mensagem += 'infome a data de nascimento\n'
        }
        if(voluntario.emailVoluntario == ''){
            mensagem += 'infome o email\n'
        }
        if(voluntario.telefonePrincipal == ''){
            mensagem += 'infome o telefone principal\n'
        }
        if(voluntario.telefoneEmergencial == ''){
            mensagem += 'infome o telefone emergencia\n'
        }
        if(voluntario.dataIngressao == ''){
            mensagem +='infome a data de ingressão\n'
        }
        if(voluntario.numAcoes == ''){
            mensagem += 'infome o numeros de ações\n'
        }
       
        if(mensagem != ''){
            alert(mensagem)
            return false
        }
        return true
    }


    //LIMPAR DADOS 
    limpar_dados(){
        document.getElementById('campo-nome').value = ''
        document.getElementById('campo-nome-social').value = ''
        document.getElementById('campo-email').value = ''
        document.getElementById('campo-telefone-principal').value = ''
        document.getElementById('campo-telefone-emergencial').value =''

        document.getElementById('editar').innerHTML =  'Cadastrar'
        this.editId = null


    }   

   

}

let voluntario = new Voluntario()