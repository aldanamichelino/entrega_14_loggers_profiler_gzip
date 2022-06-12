const constants = require('../../constants/api.constants');
const { formatErrorObject } = require('../../utils/api.utils');
const DAOSFactory = require('../../models/daos/Daos.factory');
const args = require('../../utils/persistency');

const {
    STATUS: {
        INTERNAL_ERROR,
        NOT_FOUND,
        BAD_REQUEST
    }
} = constants;

class UserService {
    constructor() {
        this.userDAO = DAOSFactory.getDAOS(args.DATA_SOURCE).userDao;
    }

    async createUser(userItem){
        try{
            const user = await this.userDAO.save(userItem);
            return user;
        }catch(error){
            console.log(error.message);
        }
    }
      
      
    async getUserById(id) {
        try{
            const user = await this.userDAO.getById(id);
            if(!user){
                const errorMessage = `El usuario con el id ${id} no existe en nuestros registros`;
                const newError = formatErrorObject(NOT_FOUND.tag, errorMessage);
                throw new Error(JSON.stringify(newError));
            } else {
                return user;
            }
    
        }catch(error){
            const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
            throw new Error(JSON.stringify(newError));
        }
    }
    
    
    async getUserByEmail(email) {
        try{
            const document = await this.userDAO.getByEmail(email);
            if(!document){
                const errorMessage = `Nombre de usuario o contraseña inválidos`;
                const newError = formatErrorObject(NOT_FOUND.tag, errorMessage);
                throw new Error(JSON.stringify(newError));
            } else {
                return document;
            }
        }   catch(error) {
            const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
            throw new Error(JSON.stringify(newError));
        }
    }
}



module.exports = {
    UserService
}