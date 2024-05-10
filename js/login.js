
//campo-usuário
//campo-senha

const Usuario = [
  {
    email: 'maria@hotmail.com',
    senha: '123'
  },
  {
    email: 'marinho@hotmail.com',
    senha: '3434'
  },
  {
    email: 'rafael@hotmail.com',
    senha: '8989'
  }
]


let botao = document.getElementById('botao-logar') //capturando o botão entrar

botao.addEventListener('click', function logar(){
  
  let pegarEmail = document.getElementById('campo-usuario').value
  let pegarSenha = document.getElementById('campo-senha').value
  let validaLogin = false //login não está validado (não está autorizado a logar)

  //percorrendo o array
  for(let i in Usuario){
    if(pegarEmail == Usuario[i].email && pegarSenha == Usuario[i].senha){
      validaLogin = true //autorizado a logar
      break
    }
  }


  //Veficando o valida login
  if(validaLogin == true){
    location.href = 'bemVindo.html'
  } else{
    alert('usuario ou senha incorretas')
  
  }
})
