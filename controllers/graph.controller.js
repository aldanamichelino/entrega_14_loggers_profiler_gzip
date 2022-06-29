const { ProductRepository } = require('../repositories/products.repository');

const productsRepository = new ProductRepository;

const getProducts = async () => {
    const products = await productsRepository.getAll();
    return products;
}

const createProduct = async ({data}) => {
    const newProduct = await productsRepository.save(data);
    return newProduct;
}

module.exports = {
    getProducts,
    createProduct
}

