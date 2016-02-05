module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL || '',
  debug: false,
  searchPath: 'knex,public',
  pool: {
    min: 0,
    max: 10,
  },
};
