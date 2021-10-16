const express = require('express')
const router = express.Router()
const User = require('../model/user')//Importando a classe user
const UserRepository = require('../repository/user')//Importando a classe UserRepository

let uRepo = new UserRepository()


//Buscar todos os usuarios
router.get('/', async(req, res) => {

    const users = await User.findAll()
    resp = {
        status: `OK`,
        data: users
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
router.post('/', async (req, res) => {
    let u = req.body//recebendo requisição no formato json



    if(u.nome == undefined || u.email == undefined ){
        resp = {
            status: `ERRO`,
            description: `User JSON must be provided.`
        }
        res.status(404).send(JSON.stringify(resp))
    }

    const user = await uRepo.insert(u)

    resp = {
        status: `OK`,
        data: `User insert with id ${user.id} sucess.`
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