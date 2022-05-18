const { Schema } = require('mongoose');

const MessagesSchema = new Schema({
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

module.exports = MessagesSchema;