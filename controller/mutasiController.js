var mutasi = require("../model/mutasi");
var rekening = require("../model/rekening");

module.exports = {
    getall: function(req, res) {
        mutasi.getall(function(err, result) {
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
        var no_rekening = req.params.no_rekening;
        rekening.getByNorekWithoutPin(no_rekening, function(err, result){
            mutasi.get(result[0].id, function(err, result) {
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
            })
        });
    }
}