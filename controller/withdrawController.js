var withdraw = require("../model/withdraw");
var mutasi = require('../model/mutasi');
var rekening = require("../model/rekening");
var history_transaksi = require("../model/history_transaksi");

module.exports = {
    create: function(req, res) {
        rekening.getByNorek(req.body.no_rekening, req.body.pin, function(err, result) {
            var rekening_id = result[0].id; var nasabah_saldo = result[0].saldo; var nasabah_bank_id = result[0].bank_id;
            withdraw.create(req.body.dates, req.body.description, req.body.nominal, rekening_id, function(err, result) {
                var last_saldo = parseInt(nasabah_saldo) - parseInt(req.body.nominal);
                rekening.updateSaldo(last_saldo, rekening_id, function(err, result) {
                    mutasi.create(req.body.dates, req.body.description, "Withdraw", req.body.nominal, last_saldo, rekening_id, function(err, result) {
                        history_transaksi.create(req.body.dates, "Withdraw", req.body.nominal, rekening_id, nasabah_bank_id, function(err, result) {
                            if (err) {
                                res.json({
                                    'status' : 'ERROR',
                                    'code' : 403,
                                    'message' : 'Failed to withdraw, pin or no_rekening is wrong!'
                                });
                            } else {
                                res.json({
                                    'status' : 'OK',
                                    'code' : 201,
                                    'message' : 'Successfully withdraw to bank account',
                                    'last_saldo': last_saldo
                                });
                            }
                        });
                    });
                });
            });
        });
    },
    getByRek: function(req, res) {
        rekening.getByNorek(req.params.no_rekening, req.params.pin, function(err, result) {
            var rekening_id = result[0].id;
            withdraw.getByRek(rekening_id, function(err, result) {
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
        });
    }
}