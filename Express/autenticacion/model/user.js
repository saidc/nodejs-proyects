var mysql = require ("mysql");
var bcryptjs = require  ("bcryptjs");

var host     = "us-cdbr-iron-east-05.cleardb.net";
var	user     = "b9034c8dcd3f9f";
var password = "495f60c6";
var database = "heroku_12a757c654ccc4a";

function setquery(queryS,callback){

	var con = mysql.createConnection({
		
	 	host     : host,
		user     : user,
		password : password,
		database : database
	});

	if (con) {
		try{
			con.on('error', function(err) {
			  console.log(err.code); // 'ER_BAD_DB_ERROR'
			
			});
			con.query(queryS,
				 function(err, results ){
				 	
				 	if (err) {
				 		console.log("error 02");
				 		Error ("se genero un error: al conectar la base de datos" + err);
				 	}else{
				 		console.log("antes de mostrar results");
					    console.log(results);
				 		callback(results );
				 	}
				 }
			);
		}catch(err){
			console.log("camptura de error try-catch");

		}
		con.end();
	}else{
		console.log("error de conexion base de datos");
	}

}

module.exports.listaPersonal = function listaPersonal(callback){
	var query = "SELECT idpersonal, nombrecompleto, rolid from heroku_12a757c654ccc4a.personal";
	console.log(query);
    setquery(query, function(err, results){
		if(err) {
			console.log("error 03");
			//res.render('index',{errors:"se agrego el Personal pero hay algun error"});
			throw err;
		}
		if (results) {
		    // verifico si se inserto un dato
		    //console.log(results);
		    
		    callback(results);

		}else{
			console.log("no hay resulado ");
			//res.render("login",{title:"logina - no se encontro el ususario", sw: false});
		}
	});
}

module.exports.registerPersonal = function registerPersonal (user,password,nombrecompleto,sexo,rolid,salario,grupoid, callback){
	bcryptjs.genSalt(10 , function(err, salt){
		    	bcryptjs.hash(password,salt,function(err , hash){
		    		password = hash;

		    		var query = " INSERT INTO `heroku_12a757c654ccc4a`.`personal`"+
			 				"(`idpersonal`,`user`,`password`,`nombrecompleto`,`sexo`,`rolid`,`salario`,`grupoid`)"+
			 		  " VALUES( null	,'"+user+"','"+password+"','"+nombrecompleto+"','"+sexo+"','"+rolid+"','"+salario+"','"+grupoid+"');";
			   		console.log(query);
				    
				    setquery(query, function(err, results){
						if(err) {
							console.log("error 03");
							//res.render('index',{errors:"se agrego el Personal pero hay algun error"});
							throw err;
						}
						if (results) {
						    // verifico si se inserto un dato
						    //console.log(results);
						    
						    callback(results);

						}else{
							console.log("no hay resulado ");
							//res.render("login",{title:"logina - no se encontro el ususario", sw: false});
						}
					});

		    	}); 
	});

	
} 

// verifico si el usuarion existe 
module.exports.login = function login(usu , pswd , callback){
	//var query  = "SELECT (*) FROM heroku_12a757c654ccc4a.usuario;";
	var query  = "SELECT COUNT(Usuario) as contador FROM heroku_12a757c654ccc4a.usuario usu WHERE usu.Usuario = \""+ usu +"\" and  usu.Password = \""+ pswd +"\" "; 
	console.log("iniciando conexion con query: \n" + query);
	setquery(query, function(results){
		if (resultado) {
				
				if (!isNaN(resultado[0].contador)) {
					if (parseInt(resultado[0].contador) == 1) {
						callback(true);	
					}else{
						callback(false);
					}
				}else{
					callback(false);
					//res.render("login",{title:"login2 - no se encontro el ususario", sw: false});
				}

				//res.send("  se encontro  el usuario");
			}else{
				res.render("login",{title:"logina - no se encontro el ususario", sw: false});
			}
	});


}

