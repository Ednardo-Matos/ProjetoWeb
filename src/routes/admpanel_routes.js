const express = require('express');
const route = express.Router();

const ensureAuthenticated = require('../middleware/authe');

const CategoryRepository = require('../repository/category_reto');
const cRepo = new CategoryRepository();

route.get('/', (req, res) =>{
  res.render("pages/adm_panel", { user: req.user })
});

route.get('/categories', ensureAuthenticated, async (req, res) => {
  let categories = await cRepo.findAll();
  res.render("pages/categories", {user: req.user, categories: categories})
});

route.get('/categories/new', ensureAuthenticated, async (req, res) => {

  let options = {
      formName: 'Nova Categoria',
      buttonName: "Cadastrar",
      category: null,
      url: '/admpanel/categories/new' 
  }
  res.render('pages/category_new', { 
      options: options,
      user: req.user,
      error: null
   });
});

route.get('/categories/edit/:id', ensureAuthenticated, async (req, res) => {
  let id = parseInt(req.params["id"]);
  let category = await cRepo.findById(id);

  let options = {
      formName: 'Editar Categoria',
      buttonName: "Editar",
       category: category[0],
       url: '/admpanel/categories/edit' 
  }
  res.render('pages/category_edit', {
      options: options,
      user: req.user,
      error: null 
  });
});

route.post('/categories/remove/:id', ensureAuthenticated, async (req, res) => {
  let id = parseInt(req.params["id"]);
  cRepo.deleteById(id);
  res.redirect("/admpanel/categories");
})


route.post('/categories/edit', ensureAuthenticated, async (req, res) => {
  let id = parseInt(req.body.id);
  let name = req.body.name;
  let description = req.body.description;

  let category = await cRepo.findById(id);
  let options = {
      formName: 'Editar Categoria',
      buttonName: "Editar",
       category: category[0],
       url: "/admpanel/categories/edit", 
  };

  if (name.length > 0) {

      let cat = {name: name, description: description};
      cRepo.update(id, cat)
      res.redirect("/admpanel/categories");


  } else {
      let error = {
          message: "O campo não pode ser vazio",
      };
      res.render("pages/category_edit", { 
          options: options,
          user: req.user,
          error: error
      });

  };
});

route.post("/categories/new", ensureAuthenticated, async (req, res) => {
  let name = req.body.name;
  let description = req.body.description;

  let options = {
      formName: 'Nova Categoria',
      buttonName: "Cadastrar",
       category: null,
       url: "/admpanel/categories/new" 
  }

  if (name.length > 0) {
      let cRepo = new CategoryRepository();
      let category = await cRepo.findByName(name);

      if(category[0]) {
          let error = {
              message: `A categoria de nome ${name} ja existe`
          };
          res.render("pages/category_new", { 
              options: options,
              user: req.user,
              error: error
          });
      } else {
          let cat = {name: name, description: description};
          cRepo.insert(cat);
          res.redirect("/admpanel/categories");
      }
    } else {
      let error = {
          message: "O campo nome é obrigatório",
      };
      res.render("pages/category_new", { 
          options: options,
          user: req.user,
          error: error
      });
  }

});

module.exports =  route;