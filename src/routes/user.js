const express = require('express')
const routes = express.Router()
const UserRepository = require('../repository/user')//Importando a classe UserRepository

let uRepo = new UserRepository()


//Buscar todos os usuarios
routes.get('/', async(_, res) => {

    let  resp = {
            status: `OK`,
            data: await uRepo.findAll(),
        };

    res.status(200).json(resp);//Pegar a lista users e gera o json dela
});


//Buscar um usuario com um ID
routes.get('/:id', async(req, res) => {
    let id =  req.params["id"]
    let user = await uRepo.findById(id);
   

    if(user.length > 0){
       let resp = {
            status: `OK`,
            data: user[0],
         
        };
        res.status(200).json(resp);
    }else{
        let resp = {
            status: "ERRO",
            description: `User with id ${id} not found.`,
        };
        res.status(404).json(resp);

    }
  
    
});


//Cadastrar um novo usuario 
routes.post('/', async (req, res) => {
    let u = req.body//recebendo requisição no formato json



    if(u.nome == undefined || u.email == undefined ){
       let resp = {
            status: `ERRO`,
            description: `User JSON with name and email must be provided.`,
        };
        res.status(404).json(resp);
    }

    let user = await uRepo.insert(u)

    let resp = {
            status: `OK`,
            data: `User with id ${user.id} was inserted with sucess.`,
    };
    res.status(200).json(resp);
});


//Atualizar um usuario existente  com um ID
routes.put('/:id', async (req, res) => {
    let id = req.params["id"];
    let u = req.body;

    let user =  await uRepo.findById(id);

    if(user.length > 0){
        if(u.nome == undefined || u.email == undefined ){
           let resp = {
                status: `ERRO`,
                description: `User JSON with name and must be provided.`
            };
            res.status(400).json(resp);    
            return;    
    };



    user = await uRepo.update(id, u);
    let resp = {
        status: `OK`,
        data: `User updater with sucess.`,
        }
    res.status(200).json(resp);
    }
});


//Deletar um usuario existente com um ID
routes.delete('/:id', async (req, res) => {
    let id = req.params["id"]
    let user = await uRepo.findById(id)

    if(user.length > 0){
        await uRepo.delete(user[0]);

       let resp = {
            status: `OK`,
            description: `User with id ${id} was delete with sucess`,
        }

        res.status(200).json(resp);

    }else{
 
        let resp = {
                status: `ERRO`,
                data: `User with id delete ${id}not found.`,
            }
        res.status(404).json(resp)
    }
  
});

module.exports = routes