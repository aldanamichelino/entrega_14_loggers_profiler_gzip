const express = require('express');
const { getAllProducts } = require('../../../controllers/products/products.controllers');
const errorMiddleware = require('../../../middlewares/errorMiddleware');
const router = express.Router();

//Routes
router.get('/productos-test', getAllProducts);

//error middleware
router.use(errorMiddleware);

module.exports = router;