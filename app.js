// Require your basic JS Libraries to operate
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const app = express();

//Make sure that morgan is used for our Dev purposes
app.use(morgan('dev'))

mongoose.connect('mongodb://localhost/prePrep');
const db = mongoose.connection;

//Handle Mongo Error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
//We are connected and good to go!
});

//Use Session(s) for tracking logins
app.use(session({
    secret: 'Work Hard',
    resave: true,
    savUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

//Parse incoming requests
app.use(bodyParser.json());
//Lets the System know that I wan to use JSON to parse DATA
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));

//
const routes = require('./routes/router');
app.use('/', routes);

//Catch 404 and forward to error Handler
app.use(function(req, res, next) {
    const err = new Error('File not found');
    err.status = 404;
    next(err);
});

//Error Handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});

const PORT = 3000;

app.listen(3000, function() {
console.log(`Express App is working on PORT ${PORT}!`)
});


// app.get((err, req, res, next) => {
// res.send('Hey, I guess this is working!')
// })


