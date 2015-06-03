var url = require('../../config/urlBase');

// SERVICES 
var fileS = require('../../services/file');
var apiBase = require('./base');

// INSTANTIATE API
var api = new apiBase(fileS);

var path = url.api;
var routes = [
	{verb: 'get', 	path: path + '/files', 			method: api.getAll},
	{verb: 'get', 	path: path + '/files/:id', 	method: api.getOneById},
	{verb: 'post', 	path: path + '/files', 			method: api.create},
	{verb: 'put', 	path: path + '/files/:id', 	method: api.update},
	{verb: 'delete', path: path + '/files/:id', 	method: api.delete}
];
api.setRoutes(routes);


module.exports = api;