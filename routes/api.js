const express = require('express');
const bodyParser = require('body-parser');

/* Any attribute object from assets */
var nasabahController = require("../controller/nasabahController");
var bankController = require("../controller/bankController");
var depositController = require('../controller/depositController');
var withdrawController = require('../controller/withdrawController');
var transferController = require('../controller/transferController');
var mutasiController = require("../controller/mutasiController");
var historyController = require("../controller/historyController");

module.exports = {
    startServer: function(port, callback) {
        const app = express();

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        
        /****************************
            NASABAH MANAGEMENT 
        *****************************/
        //Create new nasabah account
        //Request parameter: 
        //name, address, phone, gender, city, born, bank_id, pin
        app.post('/nasabah', function(req, res) {
            nasabahController.create(req, res); 
        });
        //Get nasabah by id
        app.get('/nasabah/:id', function(req, res) {
            nasabahController.getByID(req, res);
        })
        //Get All nasabah
        app.get('/nasabah/', function(req, res) {
            nasabahController.getall(req, res);
        })

        /****************************
            BANK MANAGEMENT 
        *****************************/
        //Create new bank data
        //Requirements
        //name, description, transfer_nonbank_cost
        app.post('/bank', function(req, res) {
            bankController.create(req, res);
        });
        
        //Get all bank registered
        app.get('/bank', function(req, res) {
            bankController.getall(req, res);
        });
        
        //Update some bank data
        app.put('/bank/:id', function(req, res) {
            bankController.update(req, res);
        });
        
        //Remove some bank data
        app.delete('/bank/:id', function(req, res) {
            bankController.delete(req, res);
        });
        
        /****************************
            DEPOSIT MANAGEMENT 
        *****************************/
        //Create new deposit
        app.post('/deposit', function(req, res) {
            //Requirements Parameter Body
            //dates, description, nominal, no_rekening, pin
            depositController.create(req, res);
        });
        //Show all deposit by no_rekening and pin
        app.get('/deposit/:no_rekening/:pin', function(req, res) {
            depositController.getByRek(req, res);
        });
        
        
        /****************************
            WITHDRAW MANAGEMENT 
        *****************************/
        //Create new withdraw
        app.post('/withdraw', function(req, res) {
            //Requirements Parameter Body
            //dates, description, nominal, no_rekening, pin
            withdrawController.create(req, res);
        });
        //Show all withdraw by no_rekening and pin
        app.get('/withdraw/:no_rekening/:pin', function(req, res) {
            withdrawController.getByRek(req, res);
        });

        /****************************
            TRANSFER MANAGEMENT 
        *****************************/
        //Transfer saldo to another nasabah
        //Parameter required
        //no_rekening, to_no_rekening, pin, nominal, dates, description, 
       app.post('/transfer', function(req, res) {
           transferController.send(req, res);
       });

       
        /****************************
            MUTASI MANAGEMENT 
        *****************************/
       //Show all mutasi data
       app.get('/mutasi', function(req, res) {
           mutasiController.getall(req, res);
       });
       //Show specific mutasi rekening
       app.get('/mutasi/:no_rekening', function(req, res) {
           mutasiController.get(req, res);
       })

        /****************************
        HISTORY TRANSAKSI MANAGEMENT 
        *****************************/
       //Get all history
       app.get('/history', function(req, res) {
           historyController.getall(req, res);
       })
       //Get specific bank history
       app.get('/history/:bank_id', function(req, res) {
           historyController.get(req, res);
       });

        //Server running on port specific
        app.listen(port);
        callback(null, 'Sukses');
    }
}
