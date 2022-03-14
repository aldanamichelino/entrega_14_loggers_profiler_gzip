const { mariaDB } = require('./db/config');
const knex = require('knex')(mariaDB);

knex.schema.createTable('productos', table => {
    table.increments('id')
    table.string('name').notNullable()
    table.string('price').notNullable()
    table.string('imageUrl').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now());
})
    .then(() => console.log('table created'))
    .catch((err) => {console.log(err); throw err})
    .finally(() => {
        knex.destroy();
    });