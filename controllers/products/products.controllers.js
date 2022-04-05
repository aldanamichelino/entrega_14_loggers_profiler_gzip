const MockProductsApi = require('../../models/apis/MockProductsApi');

const productsApi = new MockProductsApi('product');

const getAllProducts = (req, res, next) => {
    try {
        res.json(productsApi.getAll());
    } catch(error) {
        next(error.message);
    }
}

module.exports = {
    getAllProducts
}