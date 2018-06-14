
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('categories', function (table) {
      table.increments('id').primary();
      table.string('category');
    })
      .then(function () {
        return knex('categories').insert([
          { id: 0, category: '(blank)' },
          { id: 1, category: 'Home' },
          { id: 2, category: 'Errands' },
          { id: 3, category: 'Shopping' },
          { id: 4, category: 'Groceries' },
          { id: 5, category: 'Admin.' },
        ])
      })
  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('categories')
  ]);
};
