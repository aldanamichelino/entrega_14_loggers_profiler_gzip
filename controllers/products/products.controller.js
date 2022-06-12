const { ProductService} = require('../../services/products/products.service');
const { write } = require('../../winston/winston.config');

const productService = new ProductService;

async function postProductController(productData){
    try{
        return await productService.createProduct(productData);
    } catch(error){
        write('error', error.message);
        throw new Error(JSON.stringify(error.message));
    }
}

async function getAllProductsController(){
    try{
        return await productService.getAllProducts();
    } catch(error){
        write('error', error.message);
        throw new Error(JSON.stringify(error.message));
    }
}

module.exports = {
    postProductController,
    getAllProductsController
}


// const MockProductsApi = require('../../models/apis/MockProductsApi');

// const productsApi = new MockProductsApi('product');

// const getAllProducts = (req, res, next) => {
//     try {
//         res.json(productsApi.getAll());
//     } catch(error) {
//         next(error.message);
//     }
// }

// module.exports = {
//     getAllProducts
// }