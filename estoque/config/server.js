let express = require('express');
let consign = require('consign');
let expressSession = require('express-session');
let app = express();
let port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './app/views');


consign().include('./app/routes').then('config/dbServer.js').into(app);

app.use(expressSession({
    secret: 'ViscondedeSabugosa', //Segredo que pode ser qq string
    resave: false, //Regrava do lado do servidor toda vez
    saveUninitialized: false //cria uma sessão nova toda vez
}));

app.listen(port, function () {
    console.log('Server on port ', port);
});

module.exports = app;