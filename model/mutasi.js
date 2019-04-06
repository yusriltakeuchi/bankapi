var DB = require("../config/database");
var con = DB.getconnection();

module.exports = {
    create: function(dates, description, type, nominal, saldo_last, rekening_id, callback) {
        con.connect(function(err) {
  
            con.query("INSERT INTO mutasi (dates, description, type, nominal, saldo_last, rekening_id) " + 
                        "VALUES ('" + dates + "', '" + description + "', '" + type + "', " + nominal + ", " + saldo_last + ", " + rekening_id + ")", function(err, result) {
                if(err) {
                    callback(err);
                }
                callback(null, result);
            });
        });
    },
    getall: function(callback) {
        con.connect(function(err) {

            con.query("SELECT * FROM mutasi", function(err, result) {
                if(err) {
                    callback(err);
                }
                callback(null, result);
            });
        });
    },
    get: function(rekening_id, callback) {
        con.connect(function(err) {

            con.query("SELECT * FROM mutasi WHERE rekening_id=" + rekening_id, function(err, result) {
                if(err) {
                    callback(err);
                }
                callback(null, result);
            });
        });
    }
}