const express = require('express') //Carregando na memoria
const app = express() //Fazendo a inicialização
const port = 3000 //Criando uma porta do servidor

const sequelize = require('./database')

const userRouter = require('./routers/user')
app.use(express.json())//Habilitar express para receber json


app.use('/user', userRouter)

//Servidor
app.listen(port, async() => {
  
    await sequelize.sync({force: false})//se existe tabela apaga e cria novamente
    
    console.log(`O servidor está sendo executado na porta: ${port}`)
})