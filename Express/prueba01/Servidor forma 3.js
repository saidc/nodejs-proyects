var http = require("http");
fs   = require("fs");

fs.readFile("index.html", function(err,html){
	http.createServer(
		function(solicitud , respuesta){
			respuesta.write(html);
			respuesta.end();
		};
	).listen(8080);
});

