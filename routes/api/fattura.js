var url = require('../../config/urlBase');

// SERVICES 
var fatturaS = require('../../services/fattura');
var apiBase = require('./base');

// INSTANTIATE API
var api = new apiBase(fatturaS);

// **********************************
// PROTOTYPE API

// ------------------------------
// 1. componenteAdd
apiBase.prototype.preview = function(req, res) {
	var id = req.params.id || 0;

	fatturaS.preview(id, function(err, data) {
		if(err) { return res.status(400).end(); } 
		if(!data) { return res.status(404).end(); }

		res.contentType('application/xml');		
		return res.send(data);
	});
};

var path = url.api;
var routes = [
	{verb: 'get', 	path: path + '/fatture', 			method: api.getAll},
	{verb: 'get', 	path: path + '/fatture/:id', 	method: api.getOneById},
	{verb: 'get', 	path: path + '/fatture/:id/preview', 	method: api.preview},
	{verb: 'post', 	path: path + '/fatture', 			method: api.create},
	{verb: 'put', 	path: path + '/fatture/:id', 	method: api.update},
	{verb: 'delete', path: path + '/fatture/:id', 	method: api.delete}
];
api.setRoutes(routes);


module.exports = api;