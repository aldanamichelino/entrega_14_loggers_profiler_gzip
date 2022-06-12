const {ProductRepository} = require('../../repositories/products.repository');

class ProductService {
    constructor() {
        this.productDAO = new ProductRepository;
    }
    
    async createProduct(productData){
        try {
            return await this.productDAO.save(productData);
        } catch(error) {
            write('error', error.message);
            throw new Error(JSON.stringify(error.message));
        }
        
    }
    
    async getAllProducts(){
        try {
            return await this.productDAO.getAll();
        } catch(error) {
            write('error', error.message);
            throw new Error(JSON.stringify(error.message));
        }
    }
}


module.exports = {
    ProductService
}