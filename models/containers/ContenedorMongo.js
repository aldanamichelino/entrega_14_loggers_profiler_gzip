const mongoose = require('mongoose');
const { mongoDB } = require('../../db/config');
const { normalize, schema } = require('normalizr');

class ContenedorMongo{
    constructor(collection, schema){
        if(!mongoose.connection.readyState){
            this.connect().then(() => console.log('Database connected'));
        }
        this.model = mongoose.model(collection, schema);
    }

    async connect(){
        await mongoose.connect(mongoDB.db_uri, {dbName: 'ecommerce'});
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
            return await this.model.find({}, {__v: 0}).lean();
        } catch(error){
            console.log(error.message);
        }
    }

    async getById(id){
        try{
            return await this.model.findById(id, {__v: 0}).lean();
        } catch(error) {
            console.log(error.message);
        }
    }

}

module.exports = ContenedorMongo;