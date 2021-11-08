const sequelize = require('../database')
const { Datatypes, Model, DataTypes } = require('sequelize');

class Post extends Model{}

Post.init(
    {
        title:{
            type:DataTypes.STRING,
            allowNull: false
        },
        Text: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },{
        sequelize,
        modelName: 'Post',
        tableName: 'posts',

      }
);

module.exports = Post