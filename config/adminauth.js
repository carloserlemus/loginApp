module.exports = {
    adminRequired:  function(req, res, next) {
        if(req.user.isAdmin){
            return next();
        }
        req.flash('error_msg', 'You are not the administrator.')
        res.redirect('/users/login')
    }
}