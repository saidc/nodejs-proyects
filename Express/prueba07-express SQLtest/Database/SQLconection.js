
exports.conectarSQL = function(){
	
	var connection = mysql.createConnection({
	  host     : 'fdb14.biz.nf',
	  user     : '2077544_empresa01',
	  password : 'ProyectoDisSoft01',
	  database : 'Empresa01'
	});

	connection.connect();

	connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
	
		console.log('The solution is: ', rows[0].solution)
	});
};

exports.login(usuario , password){
	var usu = "saidjoc@gmail.com";
	var pas = "juancho";
	
	return (usuario == usu && password == pas);
}
userMode.insertUser = (userData, callback) => {
	if(connection){
		connection.query(
			"INSERT INTO users SET ?", userData,
			(err, resurlt)=>{
				if (err) {
					throw err;
				}else{
					callback(null,{
						"InsertID": result.InsertID});
				}
			});
	}
}






