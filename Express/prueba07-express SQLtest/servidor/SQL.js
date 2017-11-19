

var connection ;

function createConnectionMysql(mysql){
	connection = mysql.createConnection({
		host     : "us-cdbr-iron-east-05.cleardb.net",
		user     : "b9034c8dcd3f9f",
		password : "495f60c6",
		database : "heroku_12a757c654ccc4a"
	});
	
}
//let userModel = {};

exports.getUser = function(callback,mysql){
	
	createConnectionMysql(mysql);

	if(connection){
		connection.query(
			"SELECT * FROM Usuario ORDER BY id",
			 function(err, rows){
			 	if (err) {
			 		Error ("se quenero un error: " + err);
			 	}else{
			 		callback(null, rows);
			 	}
			 }
		);
	}else{
		console.log("no se realizo la conexion con la base de datos ");
	}

}

exports.login = function(usuario , password){
	var usu = "saidjoc@gmail.com";
	var pas = "juancho";
	
	return (usuario == usu && password == pas);
}

//module.exports = userModel;

exports.insertUser = function (userData, callback,mysql){
	createConnectionMysql(mysql);
	if(connection){
		connection.query(
			"INSERT INTO Usuario SET ?", userData,
			(err, resurlt)=>{
				if (err) {
					Error ("se quenero un error: " + err);
				}else{
					callback(null,{
						"InsertID": result.InsertID});
				}
			});
	}
}






