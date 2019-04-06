/* Any attribute object from assets */
var transfer = require("../model/transfer");
var rekening = require("../model/rekening");
var withdraw = require('../model/withdraw');
var deposit = require("../model/deposit");
var mutasi = require("../model/mutasi");
var history_transaksi = require("../model/history_transaksi");
var bank = require("../model/bank");

module.exports = {
    send: function(req, res){
        rekening.getByNorek(req.body.no_rekening, req.body.pin, function(err, result) {
            var sender_saldo = parseInt(result[0].saldo);
            var sender_rekening_id = result[0].id;
            var sender_no_rekening = result[0].no_rekening;
            var sender_bank_id = result[0].bank_id; 
            rekening.getByNorekWithoutPin(req.body.to_no_rekening, function(err, result2) {
                var receiver_saldo = parseInt(result2[0].saldo);
                var receiver_rekening_id = result2[0].id; 
                var receiver_no_rekening = result2[0].no_rekening;
                var receiver_bank_id = result2[0].bank_id;
                var nominal = parseInt(req.body.nominal);

                //Biaya admin jika beda bank
                if (sender_bank_id != receiver_bank_id){
                    bank.getCostNonBank(sender_bank_id, function(err, result) {
                        var nonbank_cost = parseInt(result);
                        sender_saldo -= (nominal + nonbank_cost);
                        //Add saldo receiver
                        receiver_saldo += nominal;
                        rekening.updateSaldo(sender_saldo, sender_rekening_id, function(err, result) {
                            rekening.updateSaldo(receiver_saldo, receiver_rekening_id, function(err, result) {
                                transfer.create(req.body.dates, sender_rekening_id, receiver_rekening_id, nominal
                                    , req.body.description, function(err, result) {
                                    withdraw.create(req.body.dates, "Transfer saldo ke rekening " + receiver_no_rekening
                                                , nominal, sender_rekening_id, function(err, result) {
                                        deposit.create(req.body.dates, "Menerima saldo dari rekening " + sender_no_rekening
                                                , nominal, receiver_rekening_id, function(err, result) {
                                            mutasi.create(req.body.dates, "Transfer saldo ke rekening " + receiver_no_rekening
                                                , "Withdraw", nominal, sender_saldo, sender_rekening_id, function(err, result) {
                                                mutasi.create(req.body.dates, "Menerima saldo dari rekening " + sender_no_rekening
                                                , "Deposit", nominal, receiver_saldo, receiver_rekening_id, function(err, result) {
                                                    history_transaksi.create(req.body.dates, "Withdraw", nominal
                                                        , sender_rekening_id, sender_bank_id, function(err, result) {
                                                        history_transaksi.create(req.body.dates, "Deposit", nominal
                                                        , receiver_rekening_id, receiver_bank_id, function(err, result) {
                                                            if (err) {
                                                                res.json({
                                                                    'status' : 'ERROR',
                                                                    'code' : 400,
                                                                    'message' : err
                                                                });
                                                            } else {
                                                                res.json({
                                                                    'status' : 'OK',
                                                                    'code' : 200,
                                                                    'message' : "Successfully transfer from rekening "
                                                                        + sender_no_rekening + " to rekening " 
                                                                        + receiver_no_rekening + " with nominal "
                                                                        + nominal
                                                                });
                                                            }
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                             });
                        });
                    });
                
                } else {
                    sender_saldo -= nominal;
                    //Add saldo receiver
                    receiver_saldo += nominal;
                    rekening.updateSaldo(sender_saldo, sender_rekening_id, function(err, result) {
                        rekening.updateSaldo(receiver_saldo, receiver_rekening_id, function(err, result) {
                            transfer.create(req.body.dates, sender_rekening_id, receiver_rekening_id, nominal
                                , req.body.description, function(err, result) {
                                withdraw.create(req.body.dates, "Transfer saldo ke rekening " + receiver_no_rekening
                                            , nominal, sender_rekening_id, function(err, result) {
                                    deposit.create(req.body.dates, "Menerima saldo dari rekening " + sender_no_rekening
                                            , nominal, receiver_rekening_id, function(err, result) {
                                        mutasi.create(req.body.dates, "Transfer saldo ke rekening " + receiver_no_rekening
                                            , "Withdraw", nominal, sender_saldo, sender_rekening_id, function(err, result) {
                                            mutasi.create(req.body.dates, "Menerima saldo dari rekening " + sender_no_rekening
                                            , "Deposit", nominal, receiver_saldo, receiver_rekening_id, function(err, result) {
                                                history_transaksi.create(req.body.dates, "Withdraw", nominal
                                                    , sender_rekening_id, sender_bank_id, function(err, result) {
                                                    history_transaksi.create(req.body.dates, "Deposit", nominal
                                                    , receiver_rekening_id, receiver_bank_id, function(err, result) {
                                                        if (err) {
                                                            res.json({
                                                                'status' : 'ERROR',
                                                                'code' : 400,
                                                                'message' : err
                                                            });
                                                        } else {
                                                            res.json({
                                                                'status' : 'OK',
                                                                'code' : 200,
                                                                'message' : "Successfully transfer from rekening "
                                                                    + sender_no_rekening + " to rekening " 
                                                                    + receiver_no_rekening + " with nominal "
                                                                    + nominal
                                                            });
                                                        }
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                         });
                    });
                }
            });
        });
    }
}
