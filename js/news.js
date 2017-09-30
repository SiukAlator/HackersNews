var express = require('express');
var news = express();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

news.get('/', function(req, res) {

    MongoClient.connect("mongodb://localhost:27017/DBMongo", function(err, db) {
        if(err) { return console.dir(err); }
        var collection = db.collection('news');

        var cursor = collection.find();
        var data = [];

        cursor.each(function(err, doc) {
          assert.equal(err, null);
          if (doc != null) {
             console.log(doc._id);
             data.push({id: doc._id, data: doc.data});

          }
          else {
              res.json(data);
          }
        });


    });
});

news.delete('/:id', function(req, res) {

  MongoClient.connect("mongodb://localhost:27017/DBMongo", function(err, db) {
      if(err) { return console.dir(err); }
      var collection = db.collection('news');
      var id = req.params.id;
      console.log('a1:'+id);
      collection.deleteMany(
      { '_id': parseInt(id) },
      function(err, results) {
         console.log(results);
         res.send((err === null) ? { msg: 'Ok' } : { msg:'error: ' + err });
         //callback();
      }
    );

    });
});

module.exports = news;
