var url = require('../../config/urlBase');

// SERVICES 
var circolareS = require('../../services/circolare');
var apiBase = require('./base');

// INSTANTIATE API
var api = new apiBase(circolareS);

var path = url.api;
var routes = [
	{verb: 'get', 	path: path + '/circolari', 			method: api.getAll},
	{verb: 'get', 	path: path + '/circolari/:id', 	method: api.getOneById},
	{verb: 'post', 	path: path + '/circolari', 			method: api.create},
	{verb: 'put', 	path: path + '/circolari/:id', 	method: api.update}
];
api.setRoutes(routes);


module.exports = api;