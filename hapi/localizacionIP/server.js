'use strict';

//const Path = require('path');
const Hapi = require('hapi');

// create new server instance
const server = new Hapi.Server({  
  host: 'localhost',
  port: 3000
});

/*
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});
*/

server.register([
    {
        register: require('hapi-geo-locate'),
        option:{
            enabledByDefault: true
        }
    }

    ],function(err) {

        if (err) {
            throw err;
        }

        server.route({
            method: 'GET',
            path: '/',
            handler: function (request, reply) {
                reply(request.location);
            }
        });

        server.start(function (err) {
            if (err) {
                throw err;
            }
            console.log("server started at: "  + server.info.uri);
        });
});
