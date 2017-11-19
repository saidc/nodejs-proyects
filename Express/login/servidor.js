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
app.use(bodyParser.json()); // para poder recive solicitudes pos

// mysql://b9034c8dcd3f9f:495f60c6@us-cdbr-iron-east-05.cleardb.net/heroku_12a757c654ccc4a?reconnect=true


app.get("/", function(req, res){
	res.render("index",{title:"HOME"});
});

app.get("/login", function(req, res){
	res.render("login",{title:"login", sw: false});
});

app.post("/user",function(req ,res){
	
	var usuario = req.body.usuario;
	var password = req.body.Password;
	
	 sqllogin(usuario , password , function(resultado){
			if (resultado) {
				console.log("en el post resultado: ");
				console.log(resultado[0].contador);

				if (!isNaN(resultado[0].contador)) {
					if (parseInt(resultado[0].contador) == 1) {
						res.render("perfil",{title:"login", sw: false});	
					}else{
						res.render("login",{title:"login2 - no se encontro el ususario", sw: false});
					}
				}else{
					res.render("login",{title:"login2 - no se encontro el ususario", sw: false});
				}

				//res.send("  se encontro  el usuario");
			}else{
				res.render("login",{title:"logina - no se encontro el ususario", sw: false});
			}
		});
	
});

app.listen(app.get("port"), function(){ 
		console.log("servidor en el puerto: " + app.get("port"));
	}
);

  
function sqllogin(usu , pswd ,calback){
	var con = mysql.createConnection({
		
	 	host     : "us-cdbr-iron-east-05.cleardb.net",
		user     : "b9034c8dcd3f9f",
		password : "495f60c6",
		database : "heroku_12a757c654ccc4a"
		
	});

	if (con) {
		var query  = "SELECT COUNT(Usuario) as contador FROM heroku_12a757c654ccc4a.usuario usu WHERE usu.Usuario = \""+ usu +"\" and  usu.Password = \""+ pswd +"\" "; 
	
		con.query(
			 query,
			 function(err, results ){
			 	if (err) {
			 		Error ("se quenero un error: " + err);
			 	}else{

			 		console.log(results);
			 		calback(results);
			 		//res.status(200).json(results);
			 	}
			 }
		);
		con.end();
	}else{
		console.log("no se realizo la conexion ");
	}

}