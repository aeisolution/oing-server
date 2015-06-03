var url = require('../../config/urlBase');

// SERVICES 
var normaS = require('../../services/norma');
var apiBase = require('./base');

// INSTANTIATE API
var api = new apiBase(normaS);

var path = url.api;
var routes = [
	{verb: 'get', 	path: path + '/norme', 			method: api.getAll},
	{verb: 'get', 	path: path + '/norme/:id', 	method: api.getOneById},
	{verb: 'post', 	path: path + '/norme', 			method: api.create},
	{verb: 'put', 	path: path + '/norme/:id', 	method: api.update}
];
api.setRoutes(routes);


module.exports = api;