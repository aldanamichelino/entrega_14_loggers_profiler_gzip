const { createMessage, getAllMessages } = require('../../services/messages/messages.service');
const { write } = require('../../winston/winston.config');


async function postMessageController(messageData){
    try{
        return await createMessage(messageData);
    } catch(error){
        write('error', error.message);
        throw new Error(JSON.stringify(error.message));
    }
}

async function getAllMessagesController(){
    try{
        return await getAllMessages();
    } catch(error){
        write('error', error.message);
        throw new Error(JSON.stringify(error.message));
    }
}

module.exports = {
    postMessageController,
    getAllMessagesController
}