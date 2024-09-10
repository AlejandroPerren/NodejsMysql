const express = require('express');
const router = express.Router();
const passport = require('../lib/passport');
router.get('/signup',(req,res) =>{
    res.render('auth/signup')
});

router.post('/signup',(req,res) =>{
    passport.authenticate('local.signup',{
        successRedirect: '/profile'
    } )
    
});

router.get('/profile', (req,res) =>{
    res.send('este es tu perfil')
})

module.exports = router;