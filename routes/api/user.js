var url = require('../../config/urlBase');

// SERVICES 
var usersS = require('../../services/user');
var apiBase = require('./base');

// **********************************
// PROTOTYPE API

// ------------------------------
// 1. componenteAdd
apiBase.prototype.changePwd = function(req, res) {
		var username 	= req.body.username || '',
				pwdOld		= req.body.pwdOld 	|| '',
				pwd				= req.body.pwd		 	|| '';
		
		usersS.existUser(username, pwdOld, function(err, data){
			if(err) { return res.status(500).end(); }

			if(!data===true) {
				res.status(401);
			  res.json({
					"status": 401,
					"message": "Credenziali non valide"
				});
				return;	
			}

			//Cambio Password
			usersS.setPassword(username, pwd, function(err, data){
				if(err) { return res.status(500).end(); }
				
				return res.status(204).end();
			});
		});
};

// ------------------------------
// 2. setReset
apiBase.prototype.setReset = function(req, res) {
	var obj = {};
	obj.username	= req.body.username || '';
	obj.mail			= req.body.mail || '';


	usersS.existUserByUsernamemail(obj.username, obj.mail, function(err, data){
		if(err) { return res.status(500).end(); }

		if(!data || data===false) { return res.status(404).end(); }

		//set token
		obj.token = crypto.randomBytes(64).toString('hex');

		usersS.getReset(obj.username, obj.mail, function(err, data) {
			if(err) { return res.status(500).end(); }

			var dt = Date.now();
			if(data) 	{ obj.dtInsert = data.dtInsert;} 
			else 			{ obj.dtInsert = dt;}

			obj.dtUpdate = dt;
			obj.status = 'toSend';

			var id = data ? data._id : newId;
			usersS.setReset(id, obj, function(err, data) {
				if(err) { return res.status(500).end(); }
				return res.status(204).end();
			});


		});

	});
	
};

// ------------------------------
// 3. checkToken
apiBase.prototype.checkToken = function(req, res) {
	var username	= req.params.username || '',
			mail			= req.params.mail || '',
			token			= req.params.token || '';
		
	if(!username || !mail || !token) {
			res.status(401);
			res.json({
				"status": 401,
				"message": "dati non validi"
			}).end();
			return;	
	}

	userS.getReset(username, mail, function(err, data) {
		if(err) { return res.status(500).end(); }

		if(!data) { return res.status(404).end(); }

		if(data.token!==token) {
			res.status(401);
			res.json({
				"status": 401,
				"message": "Dati di reset non validi o scaduti."
			}).end();
			return;	
		} else {
			res.status(204).end();
		}
	});
};

// ------------------------------
// 4. resetPassword
apiBase.prototype.resetPassword = function(req, res) {
	var username	= req.body.username || '',
			mail			= req.body.mail || '',
			token			= req.body.token || '',
			pwd				= req.body.pwd || '';
		
		if(!username || !mail || !token || !pwd) {
				res.status(401);
			  res.json({
					"status": 401,
					"message": "dati non validi"
				});
				return;	
		}
		
		userS.getReset(username, mail, function(err, data) {
			if(err) { return res.status(500).end(); }

			if(!data) { return res.status(404).end(); }

			if(data.token!==token) {
				res.status(401);
				res.json({
					"status": 401,
					"message": "Dati di reset non validi o scaduti."
				});
				return;	
			} else {
				var resetId = data._id;

				//Cambio Password
				userS.setPassword(username, pwd, function(err, data){
					if(err) { return res.status(500).end(); }

					userS.deleteReset(resetId, function() {
						return res.status(204).end();
					});
				});
			}

		});	
};


// INSTANTIATE API
var api = new apiBase(usersS);

var path = url.api;
var routes = [
	{verb: 'get', 	path: path + '/accounts', 			method: api.getAll},
	{verb: 'get', 	path: path + '/accounts/:id', 	method: api.getOneById},
	{verb: 'post', 	path: path + '/accounts', 			method: api.create},
	{verb: 'put', 	path: path + '/accounts/:id', 	method: api.update},
	{verb: 'delete',path: path + '/accounts/:id', 	method: api.delete},
	{verb: 'post', 	path: path + '/accounts/pwd/change', method: api.changePwd},
	{verb: 'post', 	path: path + '/accounts/pwd/reset', method: api.resetPassword},
	{verb: 'post', 	path: path + '/accounts/reset', method: api.setReset},
	{verb: 'get', 	path: path + '/accounts/reset/check/:username/:mail/:token', method: api.checkToken}
];
api.setRoutes(routes);


module.exports = api;