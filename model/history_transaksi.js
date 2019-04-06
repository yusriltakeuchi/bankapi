var DB = require("../config/database");
var con = DB.getconnection();

module.exports = {
    create: function(dates, type, nominal, rekening_id, bank_id, callback) {
        con.connect(function(err) {

            con.query("INSERT INTO history_transaksi (dates, type, nominal, rekening_id, bank_id) " + 
                        "VALUES ('" + dates + "', '" + type + "', " + nominal + ", " + rekening_id + ", " + bank_id + ")", function(err, result) {
                if(err) {
                    callback(err);
                }
                callback(null, result);
            });
        });
    },
    getall: function(callback) {
        con.connect(function(err) {
            con.query("SELECT * FROM history_transaksi", function(err, result) {
                if(err) {
                    callback(err);
                }
                callback(null, result);
            });
        })
    },
    get: function(bank_id, callback) {
        con.connect(function(err) {
            con.query("SELECT * FROM history_transaksi WHERE bank_id=" + bank_id, function(err, result) {
                if(err) {
                    callback(err);
                }
                callback(null, result);
            });
        })
    }
}