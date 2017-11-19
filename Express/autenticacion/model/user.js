var mysql = require ("mysql");
var bcrypt = require  ("bcryptjs");

var host     = "us-cdbr-iron-east-05.cleardb.net";
var	user     = "b9034c8dcd3f9f";
var password = "495f60c6";
var database = "heroku_12a757c654ccc4a";


var con = mysql.createConnection({
	 	host     : host,
		user     : user,
		password : password,
		database : database
});

function setquery(queryS,callback){
	if (con) {
		con.query(queryS,
			 function(err, results ){
			 	if (err) {
			 		Error ("se quenero un error: al conectar la base de datos" + err);
			 	}else{
			 		callback(results);
			 	}
			 }
		);
	}else{
		console.log("error de coneccion base de datos");
	}
}

function registerPersonal (idpersonal,user,password,nombrecompleto,sexo,rolid,salario,grupoid, callback){
	var query = " INSERT INTO `heroku_12a757c654ccc4a`.`personal`"+
 				"(`idpersonal`,`user`,`password`,`nombrecompleto`,`sexo`,`rolid`,`salario`,`grupoid`)"+
 		  "VALUES( null	,'"+user+"','"+password+"','"+nombrecompleto+"','"+sexo+"',"+rolid+","+salario+","+grupoid+");";

}

function login(usu , pswd , callback){
	//var query  = "SELECT (*) FROM heroku_12a757c654ccc4a.usuario;";
	var query  = "SELECT COUNT(Usuario) as contador FROM heroku_12a757c654ccc4a.usuario usu WHERE usu.Usuario = \""+ usu +"\" and  usu.Password = \""+ pswd +"\" "; 
	console.log("iniciando conexion con query: \n" + query);
	setquery(query, function(results){
		if(sw){
			console.log("se genero un error");

		}
	});


}

