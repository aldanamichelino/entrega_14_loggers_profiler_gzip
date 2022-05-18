const path = require('path');
require('dotenv').config();
  

module.exports = {
    sqlite: {
        client: 'sqlite3',
        connection: {
            filename: path.resolve(__dirname, "./ecommerce.sqlite")
        },
        useNullAsDefault: true
    },
    mariaDB: {
        client: 'mysql',
        connection: {
            host : '127.0.0.1',
            port : 3306,
            user : 'root',
            password : '',
            database : 'test'
        }
    },
    mongoDB: {
        db_uri: process.env.MONGO_URI
    }

}