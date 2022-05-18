const ContainerMongo = require('../containers/ContenedorMongo');

const ProductSchema = require('../schemas/Product.schema')

class ProductsDao extends ContainerMongo {
    constructor(){
        super('products', ProductSchema);
    }
}

module.exports = ProductsDao;