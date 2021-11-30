const Category = require('../model/category');

class CategoryRepository {

  insert(obj){
    return Category.create({ ...obj});
  }

  update(id, obj){
    return Category.update({ ...obj}, {where: {id: id}})
  }

  delete(obj){
    return Category.destroy({where: {idl: obj.id}})
  }

  findById(id){
    return Category.findAll({where: {id: id}})
  }

  findAll(){
    return Category.findAll();
  }
}

module.exports = CategoryRepository;