var url = require('../../config/urlBase');

// SERVICES 
var eventoFS = require('../../services/eventoFormativo');
var apiBase = require('./base');

// INSTANTIATE API
var api = new apiBase(eventoFS);

var path = url.api;
var routes = [
	{verb: 'get', 	path: path + '/eventi', 			method: api.getAll},
	{verb: 'get', 	path: path + '/eventi/:id', 	method: api.getOneById},
	{verb: 'post', 	path: path + '/eventi', 			method: api.create},
	{verb: 'put', 	path: path + '/eventi/:id', 	method: api.update}
];
api.setRoutes(routes);


module.exports = api;