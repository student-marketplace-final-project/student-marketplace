const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'y93624bp',
    database: 'Marketplace'
});

module.exports = db;