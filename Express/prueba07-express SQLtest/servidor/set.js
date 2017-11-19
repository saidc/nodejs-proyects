
module.exports = function(app) { 
	app.set("port", process.env.PORT || 3000);
	app.set("view engine","ejs"); // para mostrar html con js
};


