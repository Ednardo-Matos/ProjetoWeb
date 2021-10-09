const express = require('express')
const router = express.Router()

const UserRepository = require('../repository/user')//Importando a classe UserRepository
const User = require('../model/user')//Importando a classe user

let uRepo = new UserRepository()







//Buscar todos os usuarios
router.get('/', (req, res) => {
    resp = {
        status: `OK`,
        data: uRepo.findAll()
    }

    res.send(JSON.stringify(resp))//Pegar a lista users e gera o json dela
});


//Buscar um usuario com um ID
router.get('/:id', (req, res) => {
    let uid =  req.params.id//uid recebe o id da requisição
    user = uRepo.find(uid)

    if(user == undefined){
        resp = {
            status: `ERRO`,
            description: `User with id ${uid} was not found`
        }
        res.status(400).send(JSON.stringify(resp))
    }
    resp = {
        status: `OK`,
        data: user
    }
    res.status(200).send(JSON.stringify(resp))
    
});


//Cadastrar um novo usuario 
router.post('/', (req, res) => {
    let u = req.body//recebendo requisição no formato json

    if(u.id == undefined || u.nome == undefined || u.email == undefined ){
        resp = {
            status: `ERRO`,
            description: `User JSON must be provided.`
        }
        res.status(404).send(JSON.stringify(resp))
    }

    uRepo.insert(new User(u.id, u.nome, u.email))//Criando um novo objeto e adicionando os valores recebido no construtor da classe User
    resp = {
        status: `OK`,
        data: `User insert with sucess.`
    }
    res.status(200).send(JSON.stringify(resp))
});


//Atualizar um usuario existente  com um ID
router.put('/:id', (req, res) => {
    let uid = req.params.id
    let u = req.body

    if(u.nome == undefined || u.email == undefined ){
        resp = {
            status: `ERRO`,
            description: `User JSON must be provided.`
        }
        res.status(400).send(JSON.stringify(resp))
    }

    user = uRepo.find(uid)

    if(user == undefined){
        resp = {
            status: `ERRO`,
            description: `User with id ${uid} was not found`
        }
        res.status(400).send(JSON.stringify(resp))
    }

    user.nome = u.nome
    user.email = u.email
    uRepo.update(User)
    resp = {
        status: `OK`,
        data: `User updater with sucess.`
    }
    res.status(200).send(JSON.stringify(resp))

});


//Deletar um usuario existente com um ID
router.delete('/:id', (req, res) => {
    let uid = req.params.id
    user = uRepo.find(uid)
    if(user == undefined){
        resp = {
            status: `ERRO`,
            description: `User with id ${uid} was not found`
        }
        res.status(400).send(JSON.stringify(resp))
    }
    uRepo.delete(user)
    resp = {
        status: `OK`,
        data: `User delete with success.`
    }
    res.status(200).send(JSON.stringify(resp))
});

module.exports = router