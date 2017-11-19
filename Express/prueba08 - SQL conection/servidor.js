var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// mysql://b9034c8dcd3f9f:495f60c6@us-cdbr-iron-east-05.cleardb.net/heroku_12a757c654ccc4a?reconnect=true

app.get("/", function(req, res){
	console.log("iniciando conexion");
	var con = mysql.createConnection({
		
	 	host     : "us-cdbr-iron-east-05.cleardb.net",
		user     : "b9034c8dcd3f9f",
		password : "495f60c6",
		database : "heroku_12a757c654ccc4a"
		
	});

	if (con) {
		con.query(
			 'SELECT * FROM usuario',
			 function(err, results ){
			 	if (err) {
			 		Error ("se quenero un error: " + err);
			 	}else{

			 		console.log(results);
			 		res.status(200).json(results);
			 	}
			 }
		);
		con.end();
	}else{
		console.log("no se realizo la conexion ");
	}
});



app.listen(app.get("port"), function(){ 
		console.log("servidor en el puerto: " + app.get("port"));
	}
);