var http = require("http");

var manejador = function(solicitud, respuesta){
	console.log("solicitud por consola");

	respuesta.end("hello world saidc");
};

var servidor = http.createServer(manejador);

servidor.listen(8080);

  

