exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.uuid('id').primary();
      table.string('name');
      table.string('imageUrl');
    }),
    knex.schema.createTable('lunch_options', function(table) {
      table.uuid('id').primary();
      table.string('name');
      table.dateTime('lastChosen');
    }),
    knex.schema.createTable('people_choices', function(table) {
      table.uuid('id').primary();
      table.string('orderDetails');
      table.string('paymentAmount');
      table.boolean('isFetching');
      table.uuid('userId').references('id').inTable('users');
      table.uuid('lunchOptionId').references('id').inTable('lunch_options');
    }),
    knex.schema.createTable('splitwise_tokens', function(table) {
      table.increments('id').primary();
      table.boolean('hasAuthorizedToken');
      table.string('token');
      table.string('secret');
      table.uuid('userId').references('id').inTable('users');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('lunch_options'),
    knex.schema.dropTable('people_choices'),
    knex.schema.dropTable('splitwise_auth'),
  ]);
};
