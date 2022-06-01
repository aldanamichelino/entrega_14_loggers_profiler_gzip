const UsersDao = require('../../models/daos/Users.dao');
const constants = require('../../constants/api.constants');
const { formatErrorObject } = require('../../utils/api.utils');


const {
    STATUS: {
        INTERNAL_ERROR,
        NOT_FOUND,
        BAD_REQUEST
    }
} = constants;

const userInstance = new UsersDao;

async function createUser(userItem){
    try{
        const user = await userInstance.save(userItem);
        return user;
    }catch(error){
        console.log(error.message);
    }
}


async function getUserById(id) {
    try{
        const user = await userInstance.getById(id);
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


async function getUserByEmail(email) {
    try{
        const document = await userInstance.getByEmail(email);
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

module.exports = {
    createUser,
    getUserById,
    getUserByEmail
}