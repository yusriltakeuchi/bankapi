var bank = require("../model/bank");

module.exports = {
    create: function(req, res) {
        bank.create(req.body.name, req.body.description, req.body.transfer_nonbank_cost, function(err, result) {
            if (err) {
                res.json({
                    'status' : 'ERROR',
                    'code' : 403,
                    'message' : err
                });
            } else {
                res.json({
                    'status' : 'OK',
                    'code' : 201,
                    'message' : 'Successfully create new bank'
                });
            }
        });
    }, 
    getall: function(req, res) {
        bank.getall(function(err, result) {
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
    update: function(req, res) {
        bank.update(req.params.id, req.body.name, req.body.description, req.body.nonbank_cost, function(err, result) {
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
                });
            }
        });
    },
    delete: function(req, res) {
        bank.delete(req.params.id, function(err, result) {
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
                    'message' : 'Successfully remove bank data'
                });
            }
        })
    }
}