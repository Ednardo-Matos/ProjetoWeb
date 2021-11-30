const bcrypt = require('bcrypt');
const express = require('express');
const route = express.Router();
const passport = require('passport');

const Account = require('../model/account.js')
const AccountRepository = require('../repository/account_repo')

const salRounds = 12;
const aRepo = new AccountRepository()

route.get("/", (req, res)=> {
    console.log(req.user);
    res.render("pages/home", {user: req.user});
});

route.get("/signin", (req, res)=> {
res.render('pages/signin', { user: req.user, error: req.flash('error')[0], values: null})
});

route.post("/signin", passport.authenticate('local', {
        successRedirect: "/",
        failureRedirect: "/signin",
        failureFlash: true
    })
);

route.get("/signup", (req, res)=> {
    res.render('pages/signup', {user: req.user, error:null, values: null})
});

route.post("/signup", async(req, res)=> {

    let username = req.body.username
    let password = req.body.password
    let passwordConfirmation = req.body.passwordConfirmation
 
    if(password == passwordConfirmation){
        let ac = await aRepo.findByUsername(username);

        if(ac.length == 0){

            bcrypt.hash(password, salRounds, (_, hash)=> {
                let account = {
                    username: username,
                    password: hash, 
                };

            aRepo.insert(account)

            res.render("pages/signup_ok", {user: req.user});
            });

        }else{
            let error = {
                message: "Nome de usuario ja existe"
            }

            let values = {
                username: username,
                password: password,
                passwordConfirmation: passwordConfirmation
            }
            res.render('pages/signup', {user: req.user, error: error, values: values})
        }

    }else{
        let error = {
            message: "As senhas não coincidem"
        }
 
        let values = {
            username: username,
            password: password,
            passwordConfirmation: passwordConfirmation
        }
        res.render('pages/signup', {user: req.user, error: error, values: values})
    }

});

module.exports = route;