/**
 * Hapi Plugin Index
 */

const Path = require('path');
const nodeModulesDir = Path.join(__dirname , '../..','/node_modules');
const outputDir = Path.join(__dirname , '../..','/dist');


// Shortcut to app main page
var index_config = {
  description: 'Angular Quickstart App Index',
  notes: 'The main page for the Angular quickstart app',
  handler: {
     file: `${outputDir}/index.html`
    
  }
};

var routes = [   
  {
      method: 'GET',       
      path: '/{path_name*}',
      handler: {       
          file: function (request) {
            console.log(`${outputDir}/`+ request.params.path_name);
            return `${outputDir}/`+ request.params.path_name;
          }
      }
  },
  {
    method: 'GET',       
    path: '/node_modules/{path_name*}',
    handler: {       
        file: function (request) {
          console.log(`${nodeModulesDir}/`+ request.params.path_name);
          return `${nodeModulesDir}/`+ request.params.path_name;
        }
    }
  }
];

exports.register = (server, options, next) => {

  server.register(require('inert'), (err) => {
    if (err) { throw err; }
  });

  server.register(require('vision'), (err) => {
    if (err) { throw err; }
  });

  server.route({
    method: 'GET',
    path: '/',
    config: index_config
  });

  server.route(routes);

  next();
};

exports.register.attributes = {
  name: 'AngularModules',
  once: true
};