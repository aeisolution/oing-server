var url = require('../../config/urlBase');

// SERVICES 
var ConsiglioDS = require('../../services/consiglioDisciplina');
var apiBase = require('./base');

// ------------------------------
// 1. componenteAdd
apiBase.prototype.componenteAdd = function(req, res) {
	var id = req.params.id || 0;
	var obj = req.body;

	ConsiglioDS.componenteAdd(id, obj, function(err, data) {
		if(err) { return res.status(400).end(); } 
		if(!data) { return res.status(404).end(); }

		return res.status(204).end();	
	});
};

// ------------------------------
// 2. componenteDelete
apiBase.prototype.componenteDelete = function(req, res) {
	var id 			= req.params.id || 0,
			sezione = req.params.sezione || '',
			numero 	= req.params.numero || 0;

	ConsiglioDS.componenteDelete(id, sezione, numero, function(err, data) {
		if(err) { return res.status(400).end(); } 
		if(data.nModified==0) { return res.status(404).end(); }

		return res.status(204).end();	
	});
};

// INSTANTIATE API
var api = new apiBase(ConsiglioDS);

var path = url.api;
var routes = [
	{verb: 'get', 	path: path + '/consiglio/disciplina', 			method: api.getAll},
	{verb: 'get', 	path: path + '/consiglio/disciplina/:id', 	method: api.getOneById},
	{verb: 'post', 	path: path + '/consiglio/disciplina', 			method: api.create},
	{verb: 'put', 	path: path + '/consiglio/disciplina/:id', 	method: api.update},
	{verb: 'delete',path: path + '/consiglio/disciplina/:id', 	method: api.delete},
	{verb: 'post', 		path: path + '/consiglio/disciplina/:id/componente', 	method: api.componenteAdd},
	{verb: 'delete', 	path: path + '/consiglio/disciplina/:id/componente/:sezione/:numero', 	method: api.componenteDelete}	
];
api.setRoutes(routes);


module.exports = api;