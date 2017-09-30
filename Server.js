var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var express = require('express');
var uuidv4 = require('uuid/v4');
var assert = require('assert');
var path = require('path');

var get = require('simple-get');


var app = express();
var url = 'http://hn.algolia.com/api/v1/search_by_date?query=nodejs';



app.configure(function(){
	  app.set('port', process.env.PORT || 3000);
	  app.set('views', __dirname + '/views');
	  app.set('view engine', 'jade');
	  app.use(express.favicon());
	  app.use(express.logger('dev'));
	  app.use(express.bodyParser());
	  app.use(express.methodOverride());
	  app.use( function(req, res, next){
	    	app.locals.pretty = true
	    	next()
  });
	  app.use(app.router);
	  app.use(express.static(path.join(__dirname, 'js')));
});

app.configure('development', function(){
  	app.use(express.errorHandler());
});

app.use('/news', require('./js/news'));


app.get('/',function(req,res){
		res.render('home');
});



get(url, function (err, res) {
	  if (err) throw err;
	  //console.log('status:'+res.statusCode); // 200
	  //res.pipe(process.stdout);
		if (res.statusCode == 200)
		{
				var data = '';
				 res.on('data', function (dataIn) {
					 		//saveData(JSON.parse(data.toString()).hits);
							data =  data + dataIn.toString();
				 });
 					res.on('end', function() {
								saveData(JSON.parse(data).hits);
 				});
	 	}
});


function saveData(data)
{
			MongoClient.connect("mongodb://localhost:27017/DBMongo", function(err, db) {
					if(err) { return console.dir(err); }
					for (var index in data)
					{
							var objectData = {
									'_id': Math.floor((Math.random() * 99999999) + 10000000),
									'data': data[index]
							};

							var collection = db.collection('news');

						  collection.insert(objectData);


					}
			});
}


app.listen(3000,function(){
	  console.log("Live at Port 3000");
});
