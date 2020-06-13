
/* Import modules */
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var package = require('./package.json');
var passport = require('./helpers/Passport');
var session = require('express-session');
let sslRedirect = require('heroku-ssl-redirect');

// Gestion des login mdp de la BDD
var dotenv = require('dotenv').config();
var MongoStore = require('connect-mongo')(session);

/* Import middlewares */
var cors = require('./middlewares/cors');

/* Import routes */
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

/* Create app */
var app = express();
/* Configuration */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* CORS */
if(process.env.NODE_ENV === 'development') {
    app.use(cors.handle);

    /* XHR filter */
// app.use((req, res, next) => {
//   if(!req.xhr) {
//       return res.status(405).end();
//   }
//   next();
// });
}

/* Get database address */
var database = process.env.mongoDB || 'mongodb://localhost:27017/' + package.name;
/* Connect database and listen on provided port, on all network interfaces. */
mongoose.connect(database, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
mongoose.connection.on('error', () => {
  console.log("Database connection error");
});

/* Gestion des sessions */
app.use(
    session({
        secret: `${process.env.SECRET_SESSION}`,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
        resave: false,
        saveUninitialized: false
    })
);

// Passport
app.use(passport.initialize());
app.use(passport.session()); // calls the deserializeUser

// HEROKU HTTPS
app.use(sslRedirect());

// Enregistrement des routes dans l'application
app.use('/api/', stuffRoutes);
app.use('/auth/', userRoutes);

// HEROKU
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
    });
}

module.exports = app;