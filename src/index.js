const express = require('express') //Carregando na memoria
const app = express() //Fazendo a inicialização
const port = 3000 //Criando uma porta do servidor

const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('database',
    'root',
    'alice*23122020',
    { dialect: 'mysql' })

const userRouter = require('./routers/user')
app.use(express.json())//Habilitar express para receber json


app.use('/user', userRouter)

//Servidor
app.listen(port, () => {
    console.log(`O servidor está sendo executado na porta: ${port}`)
})