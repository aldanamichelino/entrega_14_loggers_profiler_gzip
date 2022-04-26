const path = require('path');
const express = require('express');
const apiRoutes = require('./api/api.routes');
const apiRandom = require('./randoms/randoms.router');
const auth = require('../middlewares/auth');

const router = express.Router();

//Routes
router.use('/api', apiRoutes);
router.use('/api_randoms', apiRandom);

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

router.get('/info', (req, res) => {
    res.render('info', {process: process, rss: process.memoryUsage().rss, argv: process.argv.slice(2)});
});

module.exports = router;