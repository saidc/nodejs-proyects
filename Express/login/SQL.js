

var connection ;

function createConnectionMysql(mysql){
	connection = mysql.createConnection({
		host     : "",
		user     : "",
		password : ",
		database : ""
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






