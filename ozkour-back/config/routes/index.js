const fs = require('fs');

let routes = [];

//Export all of the routes present in the directory of index.js
fs.readdirSync(__dirname)
  .filter(file => file != 'index.js')
  .forEach(file => {
    routes = routes.concat(require(`./${file}`))
  });

module.exports = routes;