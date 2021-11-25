const express = require('express');
const route = express.Router();

const Account = require('../model/account.js')
const AccountRepository = require('../repository/account_repo')

const aRepo = new AccountRepository()

route.get("/", (req, res)=> {
    res.render('pages/home')
});

route.get("/signin", (_, res)=> {
    res.render('pages/signin')
});

route.get("/signup", (_, res)=> {
    res.render('pages/signup')
});

route.post("/signup", (req, res)=> {
    let username = req.body.username
    let password = req.body.password
    let passwordConfirmation = req.body.passwordConfirmation

    if(password == passwordConfirmation){
        let account = {username: username,
             password: password, 
        };
        aRepo.insert(account)


    }


    res.render('pages/home')
});

module.exports = route;