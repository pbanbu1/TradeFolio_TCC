var http = require('http');
var url = require('url');
var express = require('express');
var bodyParser = require("body-parser");
const mongoose = require('mongoose');
const mongo_url = "mongodb+srv://vchen05:piano123@cluster0.1dyzc.mongodb.net/tradefolio?retryWrites=true&w=majority";

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

   // const url = "mongodb+srv://vchen05:piano123@cluster0.1dyzc.mongodb.net/tradefolio?retryWrites=true&w=majority";
   // mongoose.connect(
   //     url,{
   //          useNewUrlParser: true,
   //          useUnifiedTopology: true
   //         },
   //     () => console.log("Connected to db")
   // );

   // var db = mongoose.connection;
   // db.on('error', console.log.bind(console, "connection error"));
   // db.once('open', function(callback) {
   //     console.log("connection succeeded");
   // })

   // app.use(bodyParser.json());
   // app.use(express.static('public'));
   // app.use(bodyParser.urlencoded({
   //     extended: true
   // }));
   //
   // app.post('/purchase', function(req, res) {
   //     var ticker = req.body.ticker;
   //     var quantity = req.body.quatity;
   //
   //     var data = {
   //         "ticker": name,
   //         "quanity": email,
   //     }
   //     db.collection('stocks').insertOne(data, function(err, collection) {
   //         if (err) throw err;
   //         console.log("Record inserted Successfully");
   //
   //     });
   //
   //     return res.redirect('purchase.html');
   // })

})

app.post('/purchase_onetime', async (req, res) => {
    console.log("inside purchase_onetime");

    var ticker = req.body.ticker;
    var quantity = req.body.quatity;

    console.log("entry_add " + ticker + quantity);

    const client = await MongoClient.connect(mongo_url)
    try {
        const dbo = client.db("tradefolio");
        var coll = dbo.collection('stocks');

        theQuery = { "_id" : ObjectId(req.user_id)}
        updateDocument = {
            $push: { "entry": {"ticker": ticker, "quantity": quantity}},
        };
        await coll.updateOne(theQuery, updateDocument);
        console.log("push success");

        return res.status(200).json({message: "success"});
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
})

// mongoose.connect('mongodb+srv://vchen05:vchen05@cluster0.1dyzc.mongodb.net/tradefolio?retryWrites=true&w=majority',{
//      useNewUrlParser: true,
//      useUnifiedTopology: true
//  });
// var db = mongoose.connection;
// db.on('error', console.log.bind(console, "connection error"));
// db.once('open', function(callback) {
//     console.log("connection succeeded");
// })
//
// app.use(bodyParser.json());
// app.use(express.static('public'));
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
//
// app.post('/purchase', function(req, res) {
//     var ticker = req.body.ticker;
//     var quantity = req.body.quatity;
//
//     var data = {
//         "ticker": name,
//         "quanity": email,
//     }
//     db.collection('stocks').insertOne(data, function(err, collection) {
//         if (err) throw err;
//         console.log("Record inserted Successfully");
//
//     });
//
//     return res.redirect('purchase.html');
// })


// app.get('/', function(req, res) {
//     res.set({
//         'Access-control-Allow-Origin': '*'
//     });
//     return res.redirect('purchase.html');
// }).listen(3000)


// console.log("Example app listening at http://%s:%s", host, port)
