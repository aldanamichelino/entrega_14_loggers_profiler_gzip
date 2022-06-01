const MessagesDao = require('../../models/daos/Messages.dao');
const { write } = require('../../winston/winston.config');

const messageInstance = new MessagesDao;
const { normalize, schema } = require('normalizr');

const authorSchema = new schema.Entity('author');
const messageSchema = new schema.Entity('message', {
    author: authorSchema
}, {idAttribute: '_id'});
const messagesSchema = new schema.Entity('messages', {
    messages: [messageSchema]
});

async function createMessage(messageData){
    try {
        return await messageInstance.save(messageData);
    } catch(error) {
        write('error', error.message);
        throw new Error(JSON.stringify(error.message));
    }
}

async function getAllMessages(){
    try {
        const messages = await messageInstance.getAll();
        
        const messagesToNormalize = {
            id: 'messages',
            messages: messages
        }

        return normalize(messagesToNormalize, messagesSchema);
    } catch(error) {
        write('error', error.message);
        throw new Error(JSON.stringify(error.message));
    }
}

module.exports = {
    createMessage,
    getAllMessages
}