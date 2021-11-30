const dotenv = require('dotenv')
dotenv.config()

const express = require('express'); //Carregando na memoria
const expressLayouts = require('express-ejs-layouts');
const database = require('./src/database');
const routes = require('./src/routes')

const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const AccountRepository = require('./src/repository/account_repo');
const bcrypty = require('bcrypt');




const app = express() //Fazendo a inicialização
const port = 3000 //Criando uma porta do servidor

app.use(express.json())//Habilitar express para receber json
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');//renderizar as paginas
app.use(expressLayouts);
app.use(express.static(__dirname + '/public'));

app.use(session({
    secret: '1234',
    revare: false,
    saveUninitialized: true
}));

app.use(cookieParser());
app.use(flash());
app.use(passport.initialize());
//app.use(passport.authenticate('session'));
app.use(passport.session());


passport.use(new LocalStrategy(
    async (username, password, done)=> {
        let aRepo = new AccountRepository();
        let account = await aRepo.findByUsername(username);

        if(account.length == 0){ 
            return done(null, false, {message: 'Usuario não encontrado'});
        }

        bcrypty.compare(password, account[0].password, (err, result)=> {
            if(err){
                return done(err);
            }

            if(!result){
                return done(null, false,{message: 'Senha invalida'});
            }
            return done(null, account[0]);
        });

    }   
));

passport.serializeUser((user, done)=> {
    done(null, {id: user.id})
});

passport.deserializeUser( async (obj, done)=> {
    let aRepo = new AccountRepository();
    let account = await aRepo.findById(obj.id);
    return done(null, account[0]);
});

app.use('/', routes)

//Servidor
app.listen(port, async() => {
    await database.sync({force: true})
    console.log(`O servidor está sendo executado na porta: ${port}`)
})