var url = require('../../config/urlBase');

// **********************************
// SERVICES 
var commissioneS = require('../../services/commissione');
var apiBase = require('./base');

// **********************************
// PROTOTYPE API

// ------------------------------
// 1. componenteAdd
apiBase.prototype.componenteAdd = function(req, res) {
	var id = req.params.id || 0;
	var obj = req.body;

	commissioneS.componenteAdd(id, obj, function(err, data) {
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

	commissioneS.componenteDelete(id, sezione, numero, function(err, data) {
		if(err) { return res.status(400).end(); } 
		if(data.nModified==0) { return res.status(404).end(); }

		return res.status(204).end();	
	});
};

// ------------------------------
// 3. componenteAdd
apiBase.prototype.componenteChangeRole = function(req, res) {
	var id 			= req.params.id || 0,
			sezione = req.params.sezione || '',
			numero 	= req.params.numero || 0,
			ruolo		= req.body.ruolo || 'componente';

	commissioneS.componenteChangeRole(id, sezione, numero, ruolo, function(err, data) {
		if(err) { return res.status(400).end(); } 
		if(data.nModified==0) { return res.status(404).end(); }

		return res.status(204).end();	
	});
};


// ------------------------------
// 4. getAllByFilter
apiBase.prototype.getAllByFilter = function(req, res) {
	var fields = req.query || {};
	var value = req.params.filter || '';
	
	var filter = { nome: { $regex: value, $options: 'i' }};
			
	commissioneS.getAllByFilter(filter, fields, function(err, data) {		
			if(err) { return res.status(500).end(); }

			return res.json(data);
		});		
  };	

// **********************************
// INSTANTIATE API
var api = new apiBase(commissioneS);

// **********************************
// DEFINE ROUTES
var path = url.api;
var routes = [
	{verb: 'get', 		path: path + '/commissioni', 			method: api.getAll},
	{verb: 'get', 		path: path + '/commissioni/filter/:filter', method: api.getAllByFilter},
	{verb: 'get', 		path: path + '/commissioni/count', 	method: api.countAll},
	{verb: 'get', 		path: path + '/commissioni/count/page', 			method: api.countPage},
	{verb: 'get', 		path: path + '/commissioni/page/:page', 	method: api.getPage},
	{verb: 'get', 		path: path + '/commissioni/:id', 	method: api.getOneById},
	{verb: 'put', 		path: path + '/commissioni/:id', 	method: api.update},
	{verb: 'delete',	path: path + '/commissioni/:id', 	method: api.delete},
	{verb: 'post', 		path: path + '/commissioni', 	method: api.create},
	{verb: 'post', 		path: path + '/commissioni/:id/componente', 	method: api.componenteAdd},
	{verb: 'delete', 	path: path + '/commissioni/:id/componente/:sezione/:numero', 	method: api.componenteDelete},
	{verb: 'put', 		path: path + '/commissioni/:id/componente/:sezione/:numero', 	method: api.componenteChangeRole}
];
api.setRoutes(routes);


module.exports = api;
