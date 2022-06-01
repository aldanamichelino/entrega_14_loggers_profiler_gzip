const ContenedorMongo = require('../containers/ContenedorMongo');
const MessagesSchema = require('../schemas/Message.schema')


class MessagesDao extends ContenedorMongo {
    constructor(){
        super('messages', MessagesSchema);
    }
}

module.exports = MessagesDao;