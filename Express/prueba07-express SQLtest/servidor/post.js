var SQL = require ("./SQL.js");

module.exports = function(app , mysql) { 
	

	app.post("/",function(req, res){
		var email = req.body.Email;
		var password = req.body.Password;
		if(SQL.login(email , password)){	
			SQl.getUser(
				function(err, data){
					
				 res.status(200).json(data);
				}
			,mysql);
			//res.render("index",{title:"login true" , sw: true});
		}else{
			res.render("index",{title:"login" , sw: false});
		}
	});
};

