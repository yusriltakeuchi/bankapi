var DB = require("../config/database");
var con = DB.getconnection();

module.exports = {
    create: function(dates, description, nominal, rekening_id, callback) {
        con.connect(function(err) {
     
            con.query("INSERT INTO deposit (dates, description, nominal, rekening_id) " + 
                        "VALUES ('" + dates + "', '" + description + "', " + nominal + ", " + rekening_id + ")", function(err, result) {
                if(err) {
                    callback(err);
                }
                callback(null, result);
            });
        });
    },
    getByRek: function(rekening_id, callback) {
        con.connect(function(err) {
    
            con.query("SELECT * FROM deposit WHERE rekening_id=" + rekening_id, function(err, result) {
                if(err) {
                    callback(err);
                }
                callback(null, result);
            });
        })
    }
}