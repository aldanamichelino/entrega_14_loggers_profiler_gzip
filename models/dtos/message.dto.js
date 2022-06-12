class MessageDTO {
    constructor(messageObj, _id){
        Object.assign(this, messageObj);
        this.createdAt = messageObj.createdAt || Date.now();
        this.updatedAt = Date.now();
        if (_id) {
        this._id = _id;
        }
    }
}

module.exports = MessageDTO;