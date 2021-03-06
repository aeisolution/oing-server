// MODELS USED
var File = require('../models/file');

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
// 1. PREVIEW
entityS.prototype.preview = function(id, cb) {
	console.log('entityS.prototype.preview - id');
	
	File.findOne({ _id: id },  
							function(err, data){
								if(err) { return cb(err) }
								
								console.log('result findOne');
								console.dir(data);
		
								var filePath = data.path + data.filename;
		
								return cb(null, filePath);
	});		 	
}



module.exports = new entityS(File);