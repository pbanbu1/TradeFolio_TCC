var http = require('http');
var url = require('url');
var express = require('express');
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var verifyToken = require('./UserVerification.js');

const mongo_url = "mongodb+srv://vchen05:piano123@cluster0.1dyzc.mongodb.net/tradefolio?retryWrites=true&w=majority";
var app = express();
var port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/entry_add', verifyToken, async (req, res) => {
  user_text = req.body.entry;
  user_date = req.body.date;
  user_score = req.body.score;

  console.log("entry_add " + req.user_id);
  const client = await MongoClient.connect(mongo_url)
  try {
    const dbo = client.db("emotion");
    var coll = dbo.collection('users');

    theQuery = { "_id" : ObjectId(req.user_id)}
    updateDocument = {
      $push: { "entries": {"entry": user_text, "date": user_date, "score": user_score} },
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

var server = app.listen(port, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
