const { faker } = require('@faker-js/faker')

faker.locale = 'es';

const createProductItem = () => {
  return {
    name: faker.commerce.product(),
    price: faker.finance.amount(100, 1000, 0, '', true),
    imageUrl: faker.image.abstract(20, 20, true),
  }
};

module.exports = {
  createProductItem
}