const User = require('../model/user')//Importando a classe user

class UserRepository {
    constructor(){//construtor recebendo uma lista
        this.users = []
    }

    insert(obj){  
        const user = User.create({//Criando um novo objeto e adicionando os valores recebido no construtor da classe User
            nome: obj.nome,
            email: obj.email
        })
        return user;

    }

    update(user){
        for(let i =0; i< this.users.length; i++){
            if(this.users[i].id == user.uid){
                this.users[i].nome = user.nome
                this.users[i].email = user.email
                return this.users[i]
            }
        }

    }

    delete(user){
        for(let i =0; i< this.users.length; i++){
            if(this.users[i].id == user.id){
            this.users.splice(i, 1)
            }
        }

    }

    find(uid){
        for(let i =0; i< this.users.length; i++){
            if(this.users[i].id == uid){
                return this.users[i]
            }
        }
    }

    findAll(){
        return User.findAll()
    }
}

module.exports = UserRepository