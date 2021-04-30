var http = require('http');
var url = require('url');
var express = require('express');
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

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

})

app.post('/purchase_onetime', async (req, res) => {

    ticker = req.body.ticker;
    quantity = req.body.quantity;
    console.log("inside purchase_onetime", ticker, quantity);
    console.log("entry_add " + ticker + quantity);

    const client = await MongoClient.connect(mongo_url)
    try {
        const dbo = client.db("tradefolio");
        var coll = dbo.collection('stocks');

        theQuery = { "_id" : ObjectId("608b86cd3c8839d801a1f51a")}
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
