var url = require('../../config/urlBase');

// SERVICES 
var entityS = require('../../services/entity');
var apiBase = require('./base');

// Metodi ciclici
var setRoutes = function(path, paramName, api) {
	var routes = [
		{verb: 'get', 	path: path + '/' + paramName, 					method: api.getAll},
		{verb: 'get', 	path: path + '/' + paramName + '/:id', 	method: api.getOneById},
		{verb: 'post', 	path: path + '/' + paramName, 					method: api.create},
		{verb: 'put', 	path: path + '/' + paramName + '/:id', 	method: api.update},
		{verb: 'delete',path: path + '/' + paramName + '/:id', 	method: api.delete}
	];
	api.setRoutes(routes);	
}

var createParam = function(name) {
	return { name: name, model: {}, service:{}, api:{}};
}

// *******************************
// DEFINIZIONE PARAMETRI
var params = [];
params.push(createParam('categoria'));
params.push(createParam('documento'));
params.push(createParam('laurea'));
params.push(createParam('ruoloCommissione'));
params.push(createParam('ruoloConsiglio'));
params.push(createParam('settore'));
params.push(createParam('tag'));


// *******************************


// Definizione models
for(var i=0,len=params.length;i<len;i++) {
	params[i].model = require('../../models/params')[params[i].name];
}

// Definizione services
for(var i=0,len=params.length;i<len;i++) {
	params[i].service = new entityS(params[i].model);
}

// Definizione api
var api = [];
for(var i=0,len=params.length;i<len;i++) {
	params[i].api = new apiBase(params[i].service);
}

// Impostazione routes ed export
for(var i=0,len=params.length;i<len;i++) {
	setRoutes(url.api + '/params', params[i].name, params[i].api);

	module.exports[params[i].name] = params[i].api;
}
