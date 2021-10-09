class UserRepository {
    constructor(){//construtor recebendo uma lista
        this.users = []
    }

    insert(user){
        this.users.push(user)

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
        return this.users
    }
}
module.exports = UserRepository