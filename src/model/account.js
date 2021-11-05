const sequelize = require('../database')
const { Datatypes, Model, DataTypes } = require('sequelize')
const User = require('./user')

class Account extends Model{}

Account.init(
    {
        username:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false, 
        }

    },
    {
        sequelize,
        modelName: 'Account',
        tableName: 'accounts'
    }
);

module.exports = Account;