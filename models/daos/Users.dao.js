const ContainerMongo = require('../containers/ContenedorMongo');
const { formatErrorObject } = require('../../utils/api.utils');
const UserSchema = require('../schemas/User.schema');
const constants = require('../../constants/api.constants');

const {
    STATUS: {
        INTERNAL_ERROR,
        NOT_FOUND,
        BAD_REQUEST
    }
} = constants;

class UsersDao extends ContainerMongo {
    static instance;
    constructor(){
        if(!UsersDao.instance){
            super('users', UserSchema);
            UsersDao.instance = this;
            return this;
        } else {
            return UsersDao.instance;
        }
    }


    async createUser(userItem){
        try{
            const user = await this.save(userItem);
            if(user){
                await user.save();
                return user;
            }
        }catch(error){
            console.log(error.message);
        }
    }

    
    async getById(id) {
        try{
            const document = await this.model.findById(id, {__v: 0}).lean();
            if(!document){
                const errorMessage = `El usuario con el id ${id} no existe en nuestros registros`;
                const newError = formatErrorObject(NOT_FOUND.tag, errorMessage);
                throw new Error(JSON.stringify(newError));
            } else {
                return document;
            }

        }catch(error){
            const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
            throw new Error(JSON.stringify(newError));
        }
    }


    async getByEmail(email) {
        try{
            const document = await this.model.findOne({email}, {__v: 0}).lean();
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

module.exports = UsersDao;