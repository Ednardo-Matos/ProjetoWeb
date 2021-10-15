const sequelize = require('../database')
const { Datatypes, Model, DataTypes } = require('sequelize')

class User extends Model{}//ttras um conjunto de atributos cria um ID automatico
   
User.init({
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'User',
    tableName: 'users'//nome da tabela
})
module.exports = User