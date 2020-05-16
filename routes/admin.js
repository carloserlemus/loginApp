const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport');
const mongoose = require('mongoose');

//========= Import Mongoose User Model
const User = require('../models/User')

// clients page
router.get('/clients', (req, res) => {
    User.find({}, (err, clients) => {
        res.render('admin_clients', {
            clients
        })
    })
})

module.exports = router;
