const minimist = require('minimist');
require('dotenv').config();

const args = minimist(process.argv.slice(2), {
    default: {
      DATA_SOURCE : 'MONGO'
    }
});

module.exports = args;