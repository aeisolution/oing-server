var crypto = require('crypto');
var mongoose = require('mongoose');
var newId = mongoose.Types.ObjectId();

// MODELS USED
var User = require('../models/user').user;
var UserReset = require('../models/user').reset;

// SERVICES 
var entityS = require('./entity');

 
/* --------------------------------------------------------------
	Metodi CRUD base per oggetto già implementati da entity Service
	---------------------------------------------------------------
	
	Metodi Specifici per documento/oggetto Commissione:
	1. existUser
	2. existUserByUsernameMail
	3. setPassword
	4. getReset
	5. setReset
	5. deleteReset
	6. getUsernameByCodiceFiscale (non implementato in quanto legato a scheda dettaglio utente con Codice Fiscale)
	
*/

// PROTOTYPES

// ------------------------------
// 1. ExistUser
entityS.prototype.existUser = function(username, password, cb) {
	var self = this;
	
	var checksum = crypto.createHash('sha1');
	checksum.update(password);
	var pwd_hash = checksum.digest('hex');
	
	var filter = { username: username, password: pwd_hash };

	User.findOne(filter, { _id: 1 })
		.exec(function(err, data) {
			if(err) { return cb(err); }

			return cb(null, data && data._id ? true : false);
		});		
};

// ------------------------------
// 2. existUserByUsernameMail
entityS.prototype.existUserByUsernameMail = function(username, mail, cb) {
	var self = this;
	
	var filter = { username: username, mail: mail };

	User.findOne(filter, { _id: 1 })
		.exec(function(err, data) {
			if(err) { return callback(err); }

			return cb(null, data && data._id ? true : false);
		});			
};

// ------------------------------
// 3. setPassword
entityS.prototype.setPassword = function (username, newPassword, cb) {
	var filter = { username: username };

	User.findOne(filter)
		.exec(function(err, data) {
			if(err) { return cb(err); }

			var checksum = crypto.createHash('sha1');
			checksum.update(newPassword);
			var newPwd_hash = checksum.digest('hex');
		
			data.update({ $set: { password: newPwd_hash }},
								 function(err, data) {
										if(err) { return cb(err); }
				
										return cb(null, true);
		});	
	});
};

// ------------------------------
// 4. getReset
entityS.prototype.getReset = function (username, mail, cb) {
	var filter = { username: username, mail: mail };

	UserReset.findOne(filter)
		.exec(function(err, data) {
			if(err) { return cb(err); }

			return cb(null, data);
		});	
};

// ------------------------------
// 5. setReset
entityS.prototype.setReset = function (id, item, cb) {
	UserReset.update({ _id: id }, item, { upsert: true }, function(err, data) {
				if(err) { return cb(err); }
				return cb(null, data);
	});
};

// ------------------------------
// 6. deleteReset
entityS.prototype.deleteReset = function (id, cb) {
	UserReset.remove({ _id: id }, function(err, data) {
				if(err) { return cb(err); }
				return cb(null, data);
	});
};

// ------------------------------
// 7. getUsernameByCodiceFiscale
/*
entityS.prototype.getUsernameByCodiceFiscale = function (codiceFiscale, cb){
	var filter = { codiceFiscale: codiceFiscale };
	
	ngiMembro.findOne(filter, { username: 1 })
		.exec(function(err, data) {
			if(err) { return cb(err); }

			return cb(null, data);		
	});
};
*/
module.exports = new entityS(User);