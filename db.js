const mysql = require('mysql2/promise');

const opts = {
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  maxIdle: 10,
  connectionLimit: 10,
  waitForConnections: true,
}

const pool = mysql.createPool(opts)

module.exports = pool;