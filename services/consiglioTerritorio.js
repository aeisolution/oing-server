// MODELS USED
var ConsiglioT = require('../models/consiglioTerritorio');

// SERVICES 
var entityS = require('./entity');

 
/* --------------------------------------------------------------
	Metodi CRUD base per oggetto già implementati da entity Service
	---------------------------------------------------------------
	
	Metodi Specifici per documento/oggetto Commissione:
	1. 
	
	nota. Si ipotizza considera che un iscritto potrà essere inserito 
	una sola volta come componente. Pertanto l'identificazione sarà 
	effettuata mediante utilizzo di numero e sezione di iscrizione
*/

// PROTOTYPES

// ------------------------------
// 1. componenteAdd
entityS.prototype.componenteAdd = function(id, item, cb) {
	var self = this;
	
	self.componenteExist(id, item.sezione, item.numero, function(err, exist) {
		if(err) { return cb(err); }
		if(exist) { return cb({error: 'componente già presente'}); }
		
		ConsiglioT.update({ _id: id }, 
								{ $push: { componenti: item }}, 
								{ upsert: true }, 
								function(err, data){
									if(err) { return cb(err); }

									return cb(null, data);
		});
	});	
};

// ------------------------------
// 2. componenteDelete
entityS.prototype.componenteDelete = function(id, sezione, numero, cb) {
	ConsiglioT.update({ _id: id }, 
							{ $pull: { componenti: {numero: numero, sezione: sezione } }}, 
							function(err, data){
								if(err) { return cb(err) }

								return cb(null, data);
	});
};

// ------------------------------
// 3. componenteExist
entityS.prototype.componenteExist = function(id, sezione, numero, cb) {
	ConsiglioT.findOne({ _id: id, 'componenti.sezione': sezione, 'componenti.numero': numero }, 
							{ _id: 1 }, 
							function(err, data){
								if(err) { return cb(err) }
								
								if(!data) { return cb(null, false); }		
								return cb(null, true);
	});	
};


module.exports = new entityS(ConsiglioT);