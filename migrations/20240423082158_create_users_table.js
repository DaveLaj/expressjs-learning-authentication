/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
      table.increments();
      table.string('email').notNullable();
      table.string('name').notNullable();
      table.string('password').notNullable();
      table.integer('user_type_id').notNullable();
      table.timestamps();
    });
  };
  
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};


