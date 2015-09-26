import knex from 'knex';

const db = knex({
  client: 'sqlite3',
  debug: true,
  connection: {
    filename: './lunch.sqlite',
  },
});

export default db;
