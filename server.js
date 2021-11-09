const dotenv = require('dotenv')
dotenv.config()

const express = require('express'); //Carregando na memoria
const expressLayouts = require('express-ejs-layouts');
const database = require('./src/database');
const routes = require('./src/routes')


const app = express() //Fazendo a inicialização
const port = 3000 //Criando uma porta do servidor

app.use(express.json())//Habilitar express para receber json
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');//renderizar as paginas
app.use(expressLayouts)
app.use(express.static(__dirname + '/public'))

app.use('/', routes)

//Servidor
app.listen(port, async() => {
  
    await database.sync({force: true})//se existe tabela apaga e cria novamente
    //forçara barra pra criar a tabela
    console.log(`O servidor está sendo executado na porta: ${port}`)
})