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
app.get('/user:id', (req, res) => {
    res.send(`GET WITH ID: ${req.params.id}`)//retornando uma respota com o id passado como parametro
})

//Criar um novo usuario
app.post('/user', (req, res) => {
    let u = req.body//recebendo requisição no formato json
    console.log(u)//imprimindo 
    users.push(new User(u.id, u.nome, u.email))//Criando umnovo objeto e adicionando os valores recebido na classe User

    res.send("Inserido com sucesso!")
})


//Atualizar um usuario existente  com um ID
app.put('/user:id', (req, res) => {
    res.send("UPDATE")
})


//Deletar um usuario existente com um ID
app.delete('/user:id', (req, res) => {
    res.send("DELETE")
})


//Servidor
app.listen(port, () => {
    console.log(`O servidor está sendo executado na porta: ${port}`)
})