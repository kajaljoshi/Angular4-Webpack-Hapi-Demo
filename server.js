'use strict';
const Path = require('path');
const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({ port: 3000, host: 'localhost' ,router: {
    stripTrailingSlash: true
}});

server.register({
    register: require('./src/AngularModules')
})

server.views({  
    engines: {
        html: require('handlebars')
    },
    layoutPath: __dirname + '/src/view/layout',
    layout: 'default',
  });
server.start((err) => {
    if (err) { throw err; }
    console.log(' Server is listening on ' + server.info.uri.toLowerCase());
});
