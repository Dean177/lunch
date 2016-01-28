import knex from 'knex';

const db = knex({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  debug: true,
  searchPath: 'knex,public',
});

export default db;
