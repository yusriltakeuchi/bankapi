var DB = require("../config/database");
var con = DB.getconnection();

module.exports = {
    create: function(nasabah_id, bank_id, pin, callback) {
        con.connect(function(err) {
   
            var no_rekening = Math.floor(Math.random() 
                                * (9999999999 - 1000000000)) + 1000000000;
            var saldo = 0;
            con.query("INSERT INTO rekening (no_rekening, pin, saldo, nasabah_id, bank_id)" + 
                        "VALUES('" + no_rekening + "', '" + pin + "', " + saldo + ", " + nasabah_id + ", " + bank_id + ")", function(err, result) {
                if(err) {
                    callback(err);
                }
                callback(null, result);
            });
        });
    },
    updateSaldo: function(saldo, rekening_id, callback) {
        con.connect(function(err) {
    
            con.query("UPDATE rekening SET saldo=" + saldo + " WHERE id=" + rekening_id, function(err, result) {
                if(err) {
                    callback(err);
                }
                callback(null, result);
            });
        })
    },
    get: function(id, callback) {
        con.connect(function(err) {
     
            con.query("SELECT * FROM rekening WHERE id=" + id, function(err, result) {
                if (err) {
                    callback(err);
                }
                callback(null, result);
            });
        })
    },
    getByNorek: function(no_rekening, pin, callback) {
        con.connect(function(err) {
   
            con.query("SELECT * FROM rekening WHERE no_rekening='" + no_rekening + "' AND pin=" + pin, function(err, result) {
                if(err) {
                    callback(err);
                }
              
                callback(null, result);
            });
        })
    },
    getByNorekWithoutPin: function(no_rekening, callback) {
        con.connect(function(err) {
       
            con.query("SELECT * FROM rekening WHERE no_rekening='" + no_rekening + "'", function(err, result) {
                if(err) {
                    callback(err);
                }
              
                callback(null, result);
            });
        })
    }
}