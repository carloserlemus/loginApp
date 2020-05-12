const express = require('express');
const app = express();
const pug = require('pug');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport')

const PORT = process.env.PORT || 3000;

// Passport Config
require('./config/passport')(passport);

//DB Config
const db = require('./config/keys').MongoURI;

// connect to mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('Mongo DB connected.'))
    .catch(err => console.log(err))

// === Middleware === 
// Pug 
app.set('view engine', 'pug')

// Body Parser -- Now in Express
app.use(express.urlencoded({ extended: false }))
// Express Session -- middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }))

// Passport -- middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect-Flash -- middleware
app.use(flash());

// Global Variables

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// === Routes ===
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))


app.listen(PORT, (err)=>{
    if (err){
        console.log(err)
    }
    console.log('Connected to port:', PORT)
})