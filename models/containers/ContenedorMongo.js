const mongoose = require('mongoose');
const { mongoDB } = require('../../db/config');
const { normalize, schema } = require('normalizr');
const util = require('util');

class ContenedorMongo{
    constructor(collection, schema){
        this.connect().then(() => console.log('Database connected'));
        this.model = mongoose.model(collection, schema);
    }

    async connect(){
        await mongoose.connect(mongoDB.db_uri);
    }

    async save(object) {
        try{
            const newDocument = new this.model(object);
            return await newDocument.save();
        } catch(error){
            console.log(error.message);
        }
    }

    async getAll(){
        try{
            const documents = await this.model.find({}, {__v: 0}).lean();

            const documentos = {
                id: "mensajes",
                messages: documents
            }

            const authorSchema = new schema.Entity('author');
            
            const messageSchema =  new schema.Entity('message', {
                author: authorSchema
            }, {idAttribute: '_id'});

            const messageArraySchema = new schema.Entity('messageArray', {
                messages: [messageSchema]
            });

            const normalizedData = normalize(documentos, messageArraySchema);

            return normalizedData;
        } catch(error){
            console.log(error.message);
        }
    }

}

module.exports = ContenedorMongo;