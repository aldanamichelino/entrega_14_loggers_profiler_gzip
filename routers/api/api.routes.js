const express = require('express');
const authRoutes = require('./auth/auth.routes');
const randomRoutes = require('./randoms/randoms.router');
const router = express.Router();

//Routes
router.use('/auth', authRoutes);
router.use('/randoms', randomRoutes);

module.exports = router;