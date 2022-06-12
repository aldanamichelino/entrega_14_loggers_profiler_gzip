const productDTO = require('../models/dtos/product.dto');
const DAOSFactory = require('../models/daos/Daos.factory');
const args = require('../utils/persistency');

class ProductRepository {
    constructor(){
        this.product = DAOSFactory.getDAOS(args.DATA_SOURCE).productDao;
    }

    async save(object) {
        try{
            const newProductDTO = new productDTO(object);
            return await this.product.save(newProductDTO);
        } catch(error){
            console.log(error.message);
        }
    }

    async getAll(){
        try{
            const productDTOS =  await this.product.getAll();
            return productDTOS.map(dto => new productDTO(dto))
        } catch(error){
            console.log(error.message);
        }
    }

    async getById(id){
        try{
            const findProductDTO =  await this.product.getById(id);
            return new ProductDTO(findProductDTO);
        } catch(error) {
            console.log(error.message);
        }
    }
}

module.exports = {
    ProductRepository
}