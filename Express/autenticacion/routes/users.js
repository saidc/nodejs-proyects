var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var user = require("../model/user");
// register
router.get('/register', function(req, res){
	res.render('register',{errors:""});
});

router.post('/register', function(req, res){
	var usuario = req.body.usuario;
	var Password = req.body.Password ; 
	var Password2 = req.body.Password2 ; 
	var nombre = req.body.nombre;
	var sexo = req.body.sexo;
	var salario = req.body.salario;
	var idrol = req.body.idrol;
	var idgrupo = req.body.idgrupo

	console.log("usuario "+ usuario );
	console.log("Password "+ Password );
	console.log("nombre "+ nombre );
	console.log("sexo "+ sexo );
	console.log("salario "+ salario );
	console.log("idrol "+ idrol );
	console.log("idgrupo "+ idgrupo );

	req.checkBody('usuario', "el usuario es requerido").notEmpty();
	req.checkBody('Password', ' la contraseña es requerida').notEmpty();
	req.checkBody('nombre', 'el nombre es requerido').notEmpty();
	req.checkBody('sexo', 'el sexo es requerida').notEmpty();
	req.checkBody('salario', 'el salario es requerida').notEmpty();
	req.checkBody('idrol', 'el ID del Rol es requerida').notEmpty();
	req.checkBody('idgrupo', 'el ID del Grupo es requerida ').notEmpty();
	 //req.checkBody('email', 'Email is required').notEmpty();
	//req.checkBody('email', 'Email is not valid').isEmail();
	
	
	var errors = req.validationErrors();

	if(errors){
		res.render('register',{
			errors:errors
		});
		console.log("con errores");
	} else {
		console.log("sin errores");

	}

});

// login
router.get('/login', function(req, res){
	res.render('login');
});

module.exports = router;