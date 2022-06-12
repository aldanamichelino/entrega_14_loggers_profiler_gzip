const { MessageService } = require('../../services/messages/messages.service');
const { write } = require('../../winston/winston.config');

const messageService = new MessageService;


async function postMessageController(messageData){
    try{
        return await messageService.createMessage(messageData);
    } catch(error){
        write('error', error.message);
        throw new Error(JSON.stringify(error.message));
    }
}

async function getAllMessagesController(){
    try{
        return await messageService.getAllMessages();
    } catch(error){
        write('error', error.message);
        throw new Error(JSON.stringify(error.message));
    }
}

module.exports = {
    postMessageController,
    getAllMessagesController
}