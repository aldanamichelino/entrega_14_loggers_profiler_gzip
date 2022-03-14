const { sqlite } = require('./db/config');
const knex = require('knex')(sqlite);

knex.schema.createTable('mensajes', table => {
    table.increments('id')
    table.string('email').notNullable()
    table.string('message').notNullable()
    table.time('created_at').notNullable()
})
    .then(() => console.log('table created'))
    .catch((err) => {console.log(err); throw err})
    .finally(() => {
        knex.destroy();
    });