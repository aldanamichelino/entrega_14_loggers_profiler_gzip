const { createProductItem } = require('../../utils/index');
const { v4: uuid } = require('uuid');

class MockProductsApi {
    constructor(resource) {
        this.resource = resource;
    }
    
    createItem(resource) {
      const newItems = {
        product: createProductItem(),
      }
      return newItems[resource];
    }

    getAll(){
      const itemsArray = [];
      for (let i = 1; i <= 5; i++) {
        const newItem = this.createItem(this.resource);
        newItem.id = uuid();
        itemsArray.push(newItem);
      }

      return itemsArray;
    }
}

module.exports = MockProductsApi;