const bcrypt = require('bcrypt')
const express = require('express');
const route = express.Router();

const Account = require('../model/account.js')
const AccountRepository = require('../repository/account_repo')

const salRounds = 12;
const aRepo = new AccountRepository()

route.get("/", (req, res)=> {
    res.render('pages/home')
});

route.get("/signin", (_, res)=> {
    res.render('pages/signin')
});

route.get("/signup", (_, res)=> {
    res.render('pages/signup', {error:null, values: null})
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

            res.render("pages/signup_ok")
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
            res.render('pages/signup', {error: error, values: values})
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
        res.render('pages/signup', {error: error, values: values})
    }

});

module.exports = route;