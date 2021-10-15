
const { Sequelize } = require('sequelize')
const sequelize = new Sequelize(
    'blogdb',
    'root',
    'alice*23122020',
    { dialect: 'mysql'


})
module.exports = sequelize