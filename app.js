const express = require('express');
const mongoose = require('mongoose');
const pug = require('pug');
const port = process.env.PORT || 3000;
const app = express();
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

//========= Passport Config
require ('./config/passport')(passport)

//========= Template Engine
app.set('view engine', 'pug');

//========= Middleware - Body Parser
// This allows getting DATA from THE FORM with 'req.body'
app.use(express.urlencoded({ extended: false }));

//========= Mongo Connection Status and Errors
const dbUri = require('./config/keys').MongoURI;

mongoose.connect(dbUri, { useNewUrlParser: true }).then(() => console.log('connected to Mongo DB')).catch(err => console.log(err));


//========= Middleware - Express-Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//========= Middleware - PassportJS
app.use(passport.initialize());
app.use(passport.session());

//========= Middleware - Connect-Flash
app.use(flash());

//========= Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

//========= Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/admin', require('./routes/admin'))


app.listen(port, (err) =>{
    if (err) throw err;
    console.log('connected to port:', port)  
});
