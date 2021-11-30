const express = require('express');
const route = express.Router();

const CategoryRepository = require('../repository/category_reto');
const cRepo = new CategoryRepository();

route.get('/', (req, res)=> {
  res.render("pages/adm_panel", { user: req.user })
});

route.get('/categories', async(req, res)=> {
  let categories = await cRepo.findAll();
  res.render("pages/categories", { user: req.user, categories: categories})
});

route.get('/categories/new', async(req, res) =>{
  res.render('pages/categories/new', { user: req.user })
})

route.post('/categories/create', async(req, res) => {

})

module.exports = route;