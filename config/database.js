var mysql = require('mysql');

module.exports = {
    getconnection: function() {
        var con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'bankapi'
        });
        return con;
    }
}
