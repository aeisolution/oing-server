var url = require('../../config/urlBase');

// SERVICES 
var fileS = require('../../services/file');
var apiBase = require('./base');

// INSTANTIATE API
var api = new apiBase(fileS);

// ------------------------------
// 1. componenteAdd
apiBase.prototype.preview = function(req, res) {
	console.log('apiBase.prototype.preview');
	var id = req.params.id || 0;

	fileS.preview(id, function(err, data) {
		console.log('preview');
		if(err) { return res.status(400).end(); } 
		if(!data) { return res.status(404).end(); }

		return res.download(data);
	});
};

var path = url.api;
var routes = [
	{verb: 'get', 	path: path + '/files', 			method: api.getAll},
	{verb: 'get', 	path: path + '/files/:id', 	method: api.getOneById},
	{verb: 'get', 	path: path + '/files/:id/preview', 	method: api.preview},
	{verb: 'post', 	path: path + '/files', 			method: api.create},
	{verb: 'put', 	path: path + '/files/:id', 	method: api.update},
	{verb: 'delete', path: path + '/files/:id', 	method: api.delete}
];
api.setRoutes(routes);


module.exports = api;