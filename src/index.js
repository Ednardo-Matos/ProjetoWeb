const express = require('express') //Carregando na memoria
const app = express() //Fazendo a inicialização
const port = 3000 //Criando uma porta do servidor

const User = require('./model/user')//Importando a classe user

let users = []//Criando uma lsita vazia

app.use(express.json())//Habilitar express para receber json


//Buscar todos os usuarios
app.get('/user', (req, res) => {
    res.send(JSON.stringify(users))//Pegar a lista users e gera o json dela

    
})


//Buscar um usuario com um ID
app.get('/user/:id', (req, res) => {
    let uid =  req.params.id//uid recebe o id da requisição

    user = users.filter((user) => {//passando a lista users com parametro user
        return user.id == uid//verificando se o parametro = lista.id == uid
    }).pop()

    res.send(JSON.stringify(user))
})

//Cadastrar um novo usuario 
app.post('/user', (req, res) => {
    let u = req.body//recebendo requisição no formato json
    console.log(u)//imprimindo 
    users.push(new User(u.id, u.nome, u.email))//Criando um novo objeto e adicionando os valores recebido no construtor da classe User e PUSH NA LISTA USERS

    res.send("Inserido com sucesso!")
})


//Atualizar um usuario existente  com um ID
app.put('/user/:id', (req, res) => {

    let uid = req.params.id
    let u = req.body

    user = users.filter((user) => {
        return user.id == uid
    }).pop()

    user.nome = u.nome
    user.email = u.email


    res.send(JSON.stringify(user))
})


//Deletar um usuario existente com um ID
app.delete('/user/:id', (req, res) => {
    let uid = req.params.id

    for(let i = 0; i< users.length; i++){
        if(users[i].id == uid){
            users.splice(i, 1)
        }
    }
    res.send("DELETE")
})


//Servidor
app.listen(port, () => {
    console.log(`O servidor está sendo executado na porta: ${port}`)
})