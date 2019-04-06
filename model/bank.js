var DB = require("../config/database");
var con = DB.getconnection();
module.exports = {
    create: function(name, description, nonbank_cost, callback) {
        con.connect(function(err) {

            con.query("INSERT INTO bank (name, description, transfer_nonbank_cost)" + 
                        "VALUES ('" + name + "', '" + description + "', " + nonbank_cost + ")", function(err, result) {
                if (err) {
                    callback(err);
                }
                callback(null, result);
            });
        });
    },
    get: function(id, callback) {
        con.connect(function(err) {

            con.query("SELECT * FROM bank WHERE id=" + id, function(err, result) {
                if(err) {
                    callback(err);
                }
                callback(null, result);
            });
        });
    },
    getCostNonBank: function(id, callback) {
        con.connect(function(err) {

            con.query("SELECT * FROM bank WHERE id=" + id, function(err, result) {
                callback(null, result[0].transfer_nonbank_cost);
            });
        });
    },
    getall: function(callback) {
        con.connect(function(err) {

            con.query("SELECT * FROM bank", function(err, result) {
                if (err) {
                    callback(err);
                }
                callback(null, result);
            });
        });
    },
    update: function(id, name, description, nonbank_cost, callback) {
        con.connect(function(err) {
            con.query("UPDATE bank SET name='" + name + "', description='" + description + "', nonbank_cost=" + nonbank_cost + " WHERE id=" + id, function(err, result) {
                if (err) {
                    callback(err);
                }
                callback(null, result);
            });
        });
    },
    delete: function(id, callback) {
        con.connect(function(err) {
            con.query("DELETE FROM bank WHERE id=" + id, function(err, result) {
                if (err) {
                    callback(err);
                }
             
                callback(null, result);
            });
        })
    }
}