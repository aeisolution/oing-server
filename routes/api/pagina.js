var url = require('../../config/urlBase');

// SERVICES 
var paginaS = require('../../services/pagina');
var apiBase = require('./base');

// INSTANTIATE API
var api = new apiBase(paginaS);

var path = url.api;
var routes = [
	{verb: 'get', 	path: path + '/pagine', 			method: api.getAll},
	{verb: 'get', 	path: path + '/pagine/:id', 	method: api.getOneById},
	{verb: 'post', 	path: path + '/pagine', 			method: api.create},
	{verb: 'put', 	path: path + '/pagine/:id', 	method: api.update}
];
api.setRoutes(routes);


module.exports = api;