require('dotenv').config({ path: './ENV' });
const config = require('../../../knexfile');
module.exports = require('knex')(config);
