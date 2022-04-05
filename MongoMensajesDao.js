const ContenedorMongo = require('./contenedores/ContenedorMongo');
const { Schema } = require('mongoose');

const mensajesSchema = new Schema({
    author: {
        id: {type: String, require: true},
        name: {type: String, require: true},
        lastName: {type: String, require: true},
        age: {type: String, require: true},
        nickname: {type: String, require: true},
        avatar: {type: String, require: true},
    },
    text: {type: String, require: true},
    timestamp: {type: String, require: true}
});

class MongoMensajesDao extends ContenedorMongo {
    constructor(){
        super('mensajes', mensajesSchema);
    }
}

module.exports = MongoMensajesDao;