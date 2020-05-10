const express = require('express');
const app = express();
const pug = require('pug');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

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

// === Routes ===
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))


app.listen(PORT, (err)=>{
    if (err){
        console.log(err)
    }
    console.log('Connected to port:', PORT)
})