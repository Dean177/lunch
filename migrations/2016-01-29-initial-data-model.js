exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.uuid('id').primary();
      table.string('imageUrl');
      table.string('name');
    }),
    knex.schema.createTable('lunch_options', function(table) {
      table.uuid('id').primary();
      table.bigInteger('lastChosen');
      table.string('name');
    }),
    knex.schema.createTable('people_choices', function(table) {
      table.uuid('id').primary();
      table.bigInteger('dateChosen');
      table.boolean('isFetching').defaultTo(false);
      table.string('orderDetails');
      table.string('paymentAmount');
      table.uuid('lunchOptionId').references('id').inTable('lunch_options');
      table.uuid('userId').references('id').inTable('users');
    }),
    knex.schema.createTable('splitwise_tokens', function(table) {
      table.increments('id').primary();
      table.boolean('hasAuthorizedSplitwiseToken').defaultTo(false);
      table.string('secret');
      table.string('token');
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
