import {Socket} from "phoenix"

let usuario = localStorage.getItem("usuario")
if(!usuario){
  usuario = prompt("Qual o seu nome?")
  localStorage.setItem("usuario", usuario)
}

let socket = new Socket("/socket", {params: {usuario: usuario}})

let entrada = document.getElementById("entrada")
let mensagens = document.getElementById("mensagens")

socket.connect()
let channel = socket.channel("room:lobby")
channel.join()
    .receive("ok", resp => {console.log("Conectado com sucesso")})
    .receive("error", resp => {console.log("Erro ao conectar!")})

entrada.addEventListener("keyup", function(event){
  if(event.which != 13){
    return
  }
  channel.push("mensagem", {mensagem: entrada.value})
  entrada.value = ""
})

channel.on("mensagem", function(mensagem){
  mensagens.innerHTML = mensagens.innerHTML + '<div id="mensagem">' + mensagem.usuario + ' - ' + mensagem.mensagem + '</div>'
})
export default socket
