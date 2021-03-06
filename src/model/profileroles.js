const { Datatypes, Model, DataTypes } = require('sequelize');
const sequelize = require('../database');
const Profile = require('./profile');
const Role = require('./role');

class ProfileRoles extends Model{}

ProfileRoles.init({
    profileid:{
        type: DataTypes.INTEGER,
        references:{
            model: Profile,
            key: 'id'
        }
    
    },
    roleid: {
        type: DataTypes.INTEGER,
        references:{
            model: Role,
            key: 'id'
        }
    }
},    
{
    sequelize,
    modelName: 'ProfileRoles',
    tableName: 'profile_roles',
});

//Profile.belongsToMany(Role, { through: 'ProfileRoles'   })
//Role.belongsToMany(Profile, { through: 'ProfileRoles'   })


module.exports = ProfileRoles