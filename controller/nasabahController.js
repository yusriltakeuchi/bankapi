/* Any attribute object from assets */
var nasabah = require("../model/nasabah");
var rekening = require("../model/rekening");

module.exports = {
    create: function(req, res) {
        nasabah.create(req.body.name, req.body.address, req.body.phone
            , req.body.gender, req.body.city, req.body.born
            , req.body.bank_id, function(err, result) {
            if (err) {
                res.json({
                    'status' : 'ERROR',
                    'code' : 403,
                    'message' : err
                });
            } else {
                var nasabah_id = result.insertId;
                rekening.create(nasabah_id, req.body.bank_id, req.body.pin, function(err, result) {
                    if(err) {
                        res.json({
                            'status' : 'ERROR',
                            'code' : 403,
                            'message' : err
                        });
                    } else {
                        res.json({
                            'status' : 'OK',
                            'code' : 201
                        });
                    }
                });
            }
        });
    },
    getByID: function(req, res) {
        nasabah.get(req.params.id, function(err, result) {
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
    getall: function(req, res) {
        nasabah.getall(function(err, result) {
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