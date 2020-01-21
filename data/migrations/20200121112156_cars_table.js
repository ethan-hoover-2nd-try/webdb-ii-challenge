
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
      tbl.increments();
      tbl.string('make', 128).notNullable();
      tbl.string('model', 128).notNullable();
      tbl.string('vin', 64).notNullable();
      tbl.integer('mileage', 32).notNullable();
      tbl.string('transmission', 64);
      tbl.string('status', 64);

      tbl.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
