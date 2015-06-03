var url = require('../../config/urlBase');

// SERVICES 
var ingegnereS = require('../../services/ingegnere');
var apiBase = require('./base');

// INSTANTIATE API
var api = new apiBase(ingegnereS);

var path = url.api;
var routes = [
	{verb: 'get', 	path: path + '/ingegneri', 			method: api.getAll},
	{verb: 'get', 	path: path + '/ingegneri/:id', 	method: api.getOneById},
	{verb: 'post', 	path: path + '/ingegneri', 			method: api.create},
	{verb: 'put', 	path: path + '/ingegneri/:id', 	method: api.update},
	{verb: 'delete',path: path + '/ingegneri/:id', 	method: api.delete}
];
api.setRoutes(routes);


module.exports = api;