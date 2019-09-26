const mysql = require('mysql');
const { promisify } = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'clinica'
});

connection.connect = promisify(connection.connect);
connection.query = promisify(connection.query);
connection.end = promisify(connection.end);

module.exports = {
  connection
};
