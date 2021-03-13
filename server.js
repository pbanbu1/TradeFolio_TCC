var http = require('http');
var url = require('url');
var express = require('express');

var app = express();
var port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/example', async (req, res) => {
  console.log("inside example.html ");
});

app.post('/purchase', async (req, res) => {
    console.log("inside purchase.html ");
})

var server = app.listen(port, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
