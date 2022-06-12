const { write } = require('../../winston/winston.config');
const { normalize, schema } = require('normalizr');
const { MessageRepository } = require('../../repositories/message.repository')

const authorSchema = new schema.Entity('author');
const messageSchema = new schema.Entity('message', {
    author: authorSchema
}, {idAttribute: '_id'});
const messagesSchema = new schema.Entity('messages', {
    messages: [messageSchema]
});

class MessageService {
    constructor() {
        this.messageDAO = new MessageRepository;
    }
    
    async createMessage(messageData){
        try {
            return await this.messageDAO.save(messageData);
        } catch(error) {
            write('error', error.message);
            throw new Error(JSON.stringify(error.message));
        }
    }
    
    async getAllMessages(){
        try {
            const messages = await this.messageDAO.getAll();
            
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
}


module.exports = {
    MessageService
}