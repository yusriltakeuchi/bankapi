var DB = require("../config/database");
var con = DB.getconnection();

module.exports = {
    create: function(dates, rekening_id, to_rekening_id, nominal, description, callback) {
        con.connect(function(err) {
  
            con.query("INSERT INTO transfer (dates, rekening_id, to_rekening_id, nominal, description) " + 
                        "VALUES('" + dates + "', " + rekening_id + ", " + to_rekening_id + ", " + nominal + ", '" + description + "')", function(err, result) {
                if(err){
                    callback(err);
                }
                callback(err, result);
            });
        });
    }
}