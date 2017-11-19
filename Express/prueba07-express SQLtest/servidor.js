// agregando todos los require 
/*
var r = require("./servidor/require.js");
var app = r.express();
var bodyparser = r.bodyparser;
var morgan = r.morgan;
var mysql = r.mysql;
*/
var express    = require("express");
var bodyparser = require("body-parser");
var mysql  = require("mysql");
var morgan = require("morgan");
app = express();
// agregando use
app.use(morgan("dev"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

// agregando set del la app
require("./servidor/set.js")(app);

// agregando todas las solicitudes get
require("./servidor/get.js")(app);

// agregando todas las solicitudes post
require("./servidor/post.js")(app,mysql);

app.listen(app.get("port"), function(){ 
		console.log("servidor en el puerto: " + app.get("port"));
	}
);