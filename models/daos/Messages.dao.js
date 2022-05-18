const ContenedorMongo = require('../containers/ContenedorMongo');
const MessagesSchema = require('../schemas/Message.schema')


class MongoMessagesDao extends ContenedorMongo {
    constructor(){
        super('messages', MessagesSchema);
    }
}

module.exports = MongoMessagesDao;