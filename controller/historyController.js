var history = require("../model/history_transaksi");

module.exports = {
    getall: function(req, res) {
        history.getall(function(err, result) {
            if (err) {
                res.json({
                    'status' : 'ERROR',
                    'code' : 403,
                    'message' : err
                });
            } else {
                res.json({
                    'status' : 'OK',
                    'code' : 200,
                    'data' : result
                });
            }
        });
    },
    get: function(req, res) {
        history.get(req.params.bank_id, function(err, result) {
            if (err) {
                res.json({
                    'status' : 'ERROR',
                    'code' : 403,
                    'message' : err
                });
            } else {
                res.json({
                    'status' : 'OK',
                    'code' : 200,
                    'data' : result
                });
            }
        });
    }
}