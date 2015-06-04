var url = require('../../config/urlBase');

// SERVICES 
var notiziaS = require('../../services/notizia');
var apiBase = require('./base');

// INSTANTIATE API
var api = new apiBase(notiziaS);

var path = url.api;
var routes = [
	{verb: 'get', 	path: path + '/notizie', 			method: api.getAll},
	{verb: 'get', 	path: path + '/notizie/:id', 	method: api.getOneById},
	{verb: 'post', 	path: path + '/notizie', 			method: api.create},
	{verb: 'put', 	path: path + '/notizie/:id', 	method: api.update},
	{verb: 'delete', 	path: path + '/notizie/:id', 	method: api.delete}
];
api.setRoutes(routes);


module.exports = api;