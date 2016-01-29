module.exports = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  debug: true,
  searchPath: 'knex,public',
});
