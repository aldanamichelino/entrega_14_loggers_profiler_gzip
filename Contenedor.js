class Contenedor {
    constructor(knexObject, table){
        this.knexObject = knexObject;
        this.table = table;
    }

    async save(object){
        try{
            await this.knexObject(this.table).insert(object);
            console.table('Data inserted');
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async getByID(id){
        try{
            const response = await this.knexObject(this.table).select('*').where({id: id});
            console.table(response);
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async getRandom(){
        try{
            const response = await this.knexObject.from(this.table).select('*');
            let randomId = response[Math.floor(Math.random() * response.length)];
            const randomItem = await this.knexObject(this.table).select('*').where({id: randomId});
            console.table(randomItem);
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async getAll(){
        try{
            const response = await this.knexObject.from(this.table).select('*');
            console.table(response);
            return response;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async deleteById(id){
        try{
            await this.knexObject(this.table).where({id: id}).del();
            console.table('Item eliminado');
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async deleteAll(){
        try{
            await this.knexObject(this.table).del();
            console.table('Datos eliminados');
        } catch(error) {
            console.log(error);
            throw error;
        }
        
    }
}

module.exports = {
    Contenedor
}