var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var app = express();

// settings
app.set('port', process.env.PORT || 3000);
app.set("view engine" , "ejs");

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// mysql://b9034c8dcd3f9f:495f60c6@us-cdbr-iron-east-05.cleardb.net/heroku_12a757c654ccc4a?reconnect=true


app.get("/", function(req, res){
	res.render("index",{title:"login", sw: false});
});

app.post("/user",function(req ,res){
	
	var usuario = req.body.usuario;
	var password = req.body.Password;

	sqllogin(usuario , password , function(resultado){
		if (resultado) {
			console.log("en el post resultado: ");
			console.log(resultado);
			res.send("  se encontro  el usuario");
		}else{
			res.render("index",{title:"login2 - no se encontro el ususario", sw: false});
		}
	});
	
});

app.listen(app.get("port"), function(){ 
		console.log("servidor en el puerto: " + app.get("port"));
	}
);

function sqllogin(usu , pswd , callback){
	//var query  = "SELECT (*) FROM heroku_12a757c654ccc4a.usuario;";
	var query  = "SELECT COUNT(Usuario) as contador FROM heroku_12a757c654ccc4a.usuario usu WHERE usu.Usuario = \""+ usu +"\" and  usu.Password = \""+ pswd +"\" "; 
	console.log("iniciando conexion con query: \n" + query);
	var con = mysql.createConnection({
		
	 	host     : "us-cdbr-iron-east-05.cleardb.net",
		user     : "b9034c8dcd3f9f",
		password : "495f60c6",
		database : "heroku_12a757c654ccc4a"
		
	});

	if (con) {
		console.log("se realizo la conexion ");
		con.query(query,
			 function(err, results ){
			 	if (err) {
			 		Error ("se quenero un error: " + err);
			 	}else{
			 		if(!isNaN(results[0].contador)){
			 			console.log("el numero resultado si es un numero");
			 			try{
				 			resultado2 = (parseInt(results[0].contador) == 1);
				 			
				 			callback(resultado2);
				 			
				 			console.log("resultado1: " + results[0].contador);
			 				console.log("resultado2: " + resultado2);
			 			}catch(err){
			 				console.log("error: " +err);
			 			}
			 		}else{
			 			console.log("el numero resultado no es un numero");
			 		}
			 		
			 	}
			 }
		);
		con.end();

	}else{
		console.log("no se realizo la conexion ");
	}
}
