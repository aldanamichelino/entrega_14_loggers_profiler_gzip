const { createProduct, getAllProducts } = require('../../services/products/products.service');
const { write } = require('../../winston/winston.config');


async function postProductController(productData){
    try{
        return await createProduct(productData);
    } catch(error){
        write('error', error.message);
        throw new Error(JSON.stringify(error.message));
    }
}

async function getAllProductsController(){
    try{
        return await getAllProducts();
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