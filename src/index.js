const dotenv = require('dotenv')
dotenv.config()

const express = require('express') //Carregando na memoria
const database = require('./database')
const userRouter = require('./routers/user');

const app = express() //Fazendo a inicialização
const port = 3000 //Criando uma porta do servidor




app.use(express.json())//Habilitar express para receber json
app.use(express.urlencoded({extended: true}));




app.use('/user', userRouter)

//Servidor
app.listen(port, async() => {
  
    await database.sync({force: true})//se existe tabela apaga e cria novamente
    
    console.log(`O servidor está sendo executado na porta: ${port}`)
})