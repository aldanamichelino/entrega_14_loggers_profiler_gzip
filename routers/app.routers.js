const path = require('path');
const express = require('express');
const apiRoutes = require('./api/api.routes');
const auth = require('../middlewares/auth');

const router = express.Router();

//Routes
router.use('/api', apiRoutes);

router.get('/', (req, res) => {
    const user = req.user;
    if(user) {
        return res.redirect('/productos');
    } else {
        res.sendFile(path.resolve(__dirname, '../public/login.html'));
    } 
});

router.get('/rutaDeErrorRegistro', (req, res) => {
    res.render('registration-error');
});

router.get('/rutaDeErrorLogin', (req, res) => {
    res.render('login-error');
});

router.get('/productos', auth, (req, res) => {
    const user = req.user;
    res.render('productos',  {username: user.email});
});

router.get('/logout', auth, async (req, res, next) => {
    req.logOut();
    req.session.destroy(err => {
        res.clearCookie('some-session');
        if (err) {
            console.log(err);
        }
        else {
            console.log('Usuario deslogueado');
            res.redirect('/');
        }
    });
});

module.exports = router;