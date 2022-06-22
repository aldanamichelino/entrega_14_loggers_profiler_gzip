const express = require('express');
const { postProductController, getAllProductsController } = require('../../../controllers/products/products.controllers');
const errorMiddleware = require('../../../middlewares/errorMiddleware');
const router = express.Router();
const auth = require('../../../middlewares/auth');



//Routes
// router.get('/productos-test', getAllProducts);

//error middleware
router.use(errorMiddleware);

router.get('/productos', auth, (req, res) => {
    const products = await getAllProductsController();
    return products;
});

router.post('/productos', auth, (req, res) => {
    const newProduct = req.body;
    const addNewProduct = await postProductController(newProduct);
    return addNewProduct;
});

module.exports = router;