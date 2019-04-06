var api = require('./routes/api');

var port = 4000;
api.startServer(port, function(err, result) {
    if(err) {
        console.log(err);
    }
    console.log("Server running on host http://127.0.0.1:" + port);
});