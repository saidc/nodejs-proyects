var http = require("http");
fs   = require("fs");

http.createServer(
	function(solicitud , respuesta){
		fs.readFile("index.html", function(err,html){
			respuesta.write(html);
			respuesta.end();	
		});
	};
).listen(8080);