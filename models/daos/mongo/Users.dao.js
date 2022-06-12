const ContainerMongo = require('../../containers/ContenedorMongo');
const UserSchema = require('../../schemas/User.schema');

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

    async getByEmail(email){
        try{
            return await this.model.findOne({email}, {__v: 0}).lean();
        } catch(error) {
            console.log(error.message);
        }
    }
}

module.exports = UsersDao;