const express = require('express');
const authControllers = require('../../../controllers/auth/auth.controllers');
const passport = require('../../../middlewares/passport');

const router = express.Router();

router.post(
    '/register',
    passport.authenticate('register', {failureRedirect: '/rutaDeErrorRegistro'}),
    authControllers.register
);

router.post(
    '/login',
    passport.authenticate('login', {failureRedirect: '/rutaDeErrorLogin'}),
    authControllers.login
)

module.exports = router;