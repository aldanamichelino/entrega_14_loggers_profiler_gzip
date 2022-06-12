const messageDTO = require('../models/dtos/message.dto');
const DAOSFactory = require('../models/daos/Daos.factory');
const args = require('../utils/persistency');

class MessageRepository {
    constructor(){
        this.message = DAOSFactory.getDAOS(args.DATA_SOURCE).messageDao;
    }

    async save(object) {
        try{
            const newProductDTO = new messageDTO(object);
            return await this.message.save(newProductDTO);
        } catch(error){
            console.log(error.message);
        }
    }

    async getAll(){
        try{
            const messageDTOS =  await this.message.getAll();
            return messageDTOS.map(dto => new messageDTO(dto))
        } catch(error){
            console.log(error.message);
        }
    }

    async getById(id){
        try{
            const findProductDTO =  await this.message.getById(id);
            return new ProductDTO(findProductDTO);
        } catch(error) {
            console.log(error.message);
        }
    }
}

module.exports = {
    MessageRepository
}