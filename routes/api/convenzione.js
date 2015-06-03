var url = require('../../config/urlBase');

// SERVICES 
var convenzioneS = require('../../services/convenzione');
var apiBase = require('./base');

// INSTANTIATE API
var api = new apiBase(convenzioneS);

var path = url.api;
var routes = [
	{verb: 'get', 	path: path + '/convenzioni', 			method: api.getAll},
	{verb: 'get', 	path: path + '/convenzioni/:id', 	method: api.getOneById},
	{verb: 'post', 	path: path + '/convenzioni', 			method: api.create},
	{verb: 'put', 	path: path + '/convenzioni/:id', 	method: api.update}
];
api.setRoutes(routes);


module.exports = api;