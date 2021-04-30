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

// app.get('/example', async (req, res) => {
//   console.log("inside example.html ");
// });

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

app.get('/fetch_data', async (req, res) => {
  const client = await MongoClient.connect(mongo_url)
  try {
    const dbo = client.db("tradefolio");
    var coll = dbo.collection('stocks');

    theQuery = { "_id" : ObjectId("608b86cd3c8839d801a1f51a")}

    console.log("before items_found" );
    var items_found = await coll.findOne(theQuery);
    if (!items_found){
      return res.status(400).json({message: "item not found"});
    }
    console.log("items_found " + items_found);

    res.status(200).send(items_found);

  } catch (err) {
      console.log(err);
  } finally {
      client.close();
  }
});

app.post('/register', async (req, res) => {
  user_name = req.body.user;
  user_email = req.body.email;
  password = req.body.password;

  const client = await MongoClient.connect(mongo_url);
  console.log("MongoClient connect");
  try {
    const dbo = client.db("tradefolio");
    var coll = dbo.collection('stocks');

    theQuery = {email:user_email}
    console.log("theQuery " + user_email);

    var items_found = await coll.findOne(theQuery);
    if (items_found){
      console.log("user already exist!");
      return res.status(400).json({message: "user already exist"});
    }

    var newData = {"user": user_name, "email": user_email, "password": password};
    coll.insertOne(newData, function(err, res) {
      if (err) throw err;
      console.log("new document inserted");
    });
    console.log("Success!");
    return res.status(200).json({message: "success"});

  } catch (err) {
      console.log(err);
  } finally {
    client.close();
  }
})

app.post('/login', async (req, res) => {
  user_email = req.body.email;
  password = req.body.password;

  const client = await MongoClient.connect(mongo_url);
  console.log("MongoClient connect");
  try {
    const dbo = client.db("emotion");
    var coll = dbo.collection('users');

    theQuery = {email:user_email}
    console.log("theQuery " + user_email);

    var items_found = await coll.findOne(theQuery);
    if (!items_found){
      console.log("user not found");
      return res.status(400).json({message: "user not found"});
    }

    if(password_hashed != items_found.password){
      console.log("user found, password wrong");
      return res.status(400).json({message: "password not match"});
    }
    console.log("success  match");
    return res.status(200).json({message: "success", id: items_found._id});
  } catch (err) {
      console.log(err);
  } finally {
    client.close();
  }
})
