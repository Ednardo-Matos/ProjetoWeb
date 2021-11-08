const dotenv = require('dotenv')
dotenv.config()

const express = require('express'); //Carregando na memoria
const expressLayouts = require('express-ejs-layouts');
const database = require('./database');
const routes = require('./routes')


const app = express() //Fazendo a inicialização
const port = 3000 //Criando uma porta do servidor

app.use(express.json())//Habilitar express para receber json
app.use(express.urlencoded({extended: true}));

app.use('/', routes)

//Servidor
app.listen(port, async() => {
  
    await database.sync({force: true})//se existe tabela apaga e cria novamente
    //forçara barra pra criar a tabela
    console.log(`O servidor está sendo executado na porta: ${port}`)
})