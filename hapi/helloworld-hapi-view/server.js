'use strict';

//const Path = require('path');
const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({ 
    port: 3000,
    host: 'localhost'
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
        register: require('inert')
    }

    ],function(err) {

        if (err) {
            throw err;
        }

        server.route({
            method: 'GET',
            path: '/hello',
            handler: function (request, reply) {
                reply.file('./public/hello.html');
            }
        });

        server.start(function (err) {
            if (err) {
                throw err;
            }
            console.log("server started at: "  + server.info.uri);
        });
});


