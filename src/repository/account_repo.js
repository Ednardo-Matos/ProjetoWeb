const Account = require('../model/account')


class AccountRepository {
  constructor(){//construtor recebendo uma lista
      this.Accounts = []
  }

  insert(obj){  
      return Account.create({ ...obj});

  }

  update(id, obj){
              return Account.update({ ...obj}, {where: { id: id}})

  }

  delete(obj){
      return Account.destroy({where: {id: obj.id}});

  }

  findById(id){
      return Account.findAll({where: {id: id,} });
  }

  findAll(){
      return Account.findAll()
  }
}

module.exports = AccountRepository