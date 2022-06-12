const UserDaoMongo = require('./mongo/Users.dao');
const ProductDaoMongo = require('./mongo/Products.dao');
const MessageDaoMongo = require('./mongo/Messages.dao');


class DAOSFactory {
  static instance;
  
  static getDAOS(type) {
    if(!DAOSFactory.instance){
      let userDao;
      let productDao;
      let messageDao;
      switch(type.toLowerCase()) {
        case 'mem':
          userDao = new UserDaoMem();
          productDao = new ProductDaoMem();
          messageDao = new MessageDaoMem();
          break;
      case 'file':
          userDao = new UserDaoFile();
          productDao = new ProductDaoFile();
          messageDao = new MessageDaoFile();
          break;
        case 'mongo':
          userDao = new UserDaoMongo();
          productDao = new ProductDaoMongo();
          messageDao = new MessageDaoMongo();
          break;
        default:
          throw new Error('Invalid data source, please provide one of the following (MEM | FILE | MONGO)')
      }
      return {
        userDao,
        productDao,
        messageDao
      }
    } else {
      return DAOSFactory.instance;
    }
    
  }
}

module.exports = DAOSFactory;