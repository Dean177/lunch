module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  debug: process.env.NODE_ENV !== 'production',
  searchPath: 'knex,public',
  pool: {
    min: 0,
    max: 10,
  },
};
