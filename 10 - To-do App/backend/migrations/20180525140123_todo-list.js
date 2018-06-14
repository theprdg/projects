exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('list', function (table) {
    table.increments('id').primary();
    table.string('todoItem').notNullable();
    table.boolean('complete');
    table.integer('category_id');
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('list');
};