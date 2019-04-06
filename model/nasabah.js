var DB = require("../config/database");
var con = DB.getconnection();

module.exports = {
    create: function(name, address, phone, gender, city, born, bank_id, callback) {
        con.connect(function(err) {
     
            con.query("INSERT INTO nasabah (name, address, phone, gender, city, born) " + 
                        "VALUES ('" + name + "', '" + address + "', '" + phone + "', '" + gender + "', '" + city + "', '" + born + "')", function(err, result) {
                if (err) {
                    callback(err);
                }
                callback(null, result);
            });
        });
    },
    get: function(id, callback) {
        con.connect(function(err) {
       
            con.query("SELECT nb.name, nb.address, nb.phone, nb.gender, nb.city, nb.born, nb.created_at, nb.updated_at" 
                        + ", rk.no_rekening, rk.pin, rk.saldo, rk.bank_id FROM nasabah nb INNER JOIN rekening rk ON nb.id = rk.nasabah_id WHERE nb.id=" + id, function(err, result) {
                if(err) {
                    callback(err);
                }
                callback(null, result)
            });
        });
    },
    getall: function(callback) {
        con.connect(function(err) {
     
            con.query("SELECT nb.name, nb.address, nb.phone, nb.gender, nb.city, nb.born, nb.created_at, nb.updated_at" 
                        + ", rk.no_rekening, rk.pin, rk.saldo, rk.bank_id FROM nasabah nb INNER JOIN rekening rk ON nb.id = rk.nasabah_id", function(err, result) {
                if(err) {
                    callback(err);
                }
                callback(null, result)
            });
        });
    },
    update: function(id, name, address, phone, gender, city, born, callback) {
        con.connect(function(err) {
       
            con.query("UPDATE nasabah SET name='" + name + "', address='" + address + "', phone='" + phone + "', gender='" + gender + "', city='" + city + "', born='" + born + "' WHERE id=" + id, function(err, result) {
                if(err) {
                    callback(err);
                }
                callback(null, result)
            });
        });
    },
    delete: function(id, callback) {
        con.connect(function(err) {
     
            con.query("DELETE FROM nasabah WHERE id=" + id, function(err, result) {
                if(err) {
                    callback(err);
                }
                callback(null, result)
            });
        });
    }
}