// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'auth'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    }
  }
};