const router = require('express').Router();
// noinspection JSAnnotator
const User = require('../models/user');

router.route('/signup')
    .get((req, res, next) => {
        res.render('accounts/signup', { message: req.flash('errors') });
    })
    .post((req, res, next) => {
        User.findOne({ email: req.body.email}, function(err, existingUser)  {
            if (existingUser) {
                req.flash('errors', 'Account with that email address already exists');
                res.redirect('/signup');
            }   else {
                const user = new User();
                user.name = req.body.name;
                user.email = req.body.email;
                user.photo =  user.gravatar();
                user.password = req.body.password;
                user.save(function(err) {
                   // req.logIn(user, function (err) {
                        if (err) return next(err);
                        res.redirect('/');
                   // });
                });
            }
        });
    });

module.exports = router;