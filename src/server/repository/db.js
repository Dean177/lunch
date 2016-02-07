require('dotenv').config({ path: './ENV', silent: false });
const config = require('../../../knexfile');
module.exports = require('knex')(config);
