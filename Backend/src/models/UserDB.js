var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 100,
    port: 3307,
    host:'localhost',
    user:'root',
    password:'',
    database:'rentaldb',
    
});

module.exports = pool;