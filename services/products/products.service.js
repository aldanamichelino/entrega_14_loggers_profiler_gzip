const ProductsDao = require('../../models/daos/Products.dao');

const productInstance = new ProductsDao;

async function createProduct(productData){
    try {
        return await productInstance.save(productData);
    } catch(error) {
        write('error', error.message);
        throw new Error(JSON.stringify(error.message));
    }
    
}

async function getAllProducts(){
    try {
        return await productInstance.getAll();
    } catch(error) {
        write('error', error.message);
        throw new Error(JSON.stringify(error.message));
    }
}

module.exports = {
    createProduct,
    getAllProducts
}