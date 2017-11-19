var express    = require("express");
var bodyparser = require("body-parser");
var mysql  = require('mysql');
var morgan = require("morgan");
var app = express();
var port = process.env.PORT || 3000 ;
var SQL = require ("./SQLconection.js");

//SQL.conectarSQL();
app.use(morgan("dev"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "pug");

app.get("/",function(req, res){
	res.render("index");
});

app.post("/login",function(req, res){
	res.render("login",{variablev:""});
});

app.post("/Usuario",function(req, res){
	var email = req.body.Email
	var password = req.body.Password
	//console.log("leyendo la informacion");
	console.log("usuario: " + email);
	console.log("Contraseña: " + password);
	if(SQL.login(usuario,password)){
		res.send("has iniciado sesion")
	}else{
		res.render('login',{variable:"usuario no encontrado"});
	}
})

app.listen(port);