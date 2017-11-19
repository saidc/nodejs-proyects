var http = require("http");
fs   = require("fs");

var html = fs.readFileSync("index.html");

var manejador = function(solicitud , respuesta){
	respuesta.write(html);
	console.log(solicitud);
	respuesta.end();
};

var servidor = http.createServer(manejador);

servidor.listen(8080);