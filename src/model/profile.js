const sequelize = require('../database')
const { Datatypes, Model, DataTypes } = require('sequelize')

class Profile extends Model{}

Profile.init(
    {
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },

    },
    {
        sequelize,
        modelName: "Profile",
        tableName: "profiles",
    }


);