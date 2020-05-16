const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const { adminRequired} = require('../config/adminauth');

// Welcome Page
router.get('/', (req, res) => { res.render('index')})

// Admin Dashboard
router.get('/admindashboard', ensureAuthenticated, adminRequired, (req, res)=>{
    res.render('admindashboard')
})

// User Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>{
    if(req.user.isAdmin){
        res.render('admindashboard')
    }
    res.render('userdashboard', {
        name: req.user.name,
        email: req.user.email,
        isAdmin: req.user.isAdmin,
        clientId: req.user._id
    })
})

module.exports = router;