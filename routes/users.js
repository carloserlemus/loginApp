const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport');

//========= Import Mongoose User Model
const User = require('../models/User')


//========= User Routes
// User Login Page
router.get('/login', (req, res) => { res.render('login') })

//========= Registration Routes
// Registration Page
router.get('/register', (req, res) => { res.render('register') })

// Registration Handling
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;

    // Validation
    errors = [];

    // Checking to see if all the fields are filled in.
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in missing fields.' })
    }

    // Checking if passwords match.
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match.' })
    }

    // Check minimum length of password.
    if (password.length < 5) {
        errors.push({ msg: 'Password should be at least 6 characters.' })
    }

    if (errors.length > 0) {
        res.render('register', {
            errors: errors,
            name: name,
            email: email,
            password: password,
            password2: password2
        })
    } else {
        // Validation has passed.
        // Avoiding Email Duplication
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    // User Exists
                    errors.push({ msg: 'Email already exists.' })
                    res.render('register', {
                        errors: errors,
                        name: name,
                        email: email,
                        password: password,
                        password2: password2
                    })
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    })

                    // Hash Password
                    bcrypt.genSalt((err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;

                        // Set Password to hashed.
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                req.flash('success_msg', 'You are now registered, please log in!')
                                res.redirect('/users/login')
                            })
                            .catch(err => console.log(err))
                    }))
                }
            })
    }
})

// User Login Handling
// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

module.exports = router;