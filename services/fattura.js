var fs = require('fs'),
		util = require('util');

// MODELS USED
var Fattura = require('../models/fattura');

// SERVICES 
var entityS = require('./entity');

 
/* --------------------------------------------------------------
	Metodi CRUD base per oggetto già implementati da entity Service
	---------------------------------------------------------------*/

// PROTOTYPES

// ------------------------------
// 1. PREVIEW
entityS.prototype.preview = function(id, cb) {
	Fattura.findOne({ _id: id },  
							function(err, data){
								if(err) { return cb(err) }
								if(!data) { return cb(null, null); }		
		
								var filePath = data.path + data.filename;
								fs.readFile(filePath, function(err, content) {
									if (err) return cb(new Error(err));

									var fattura = content.toString();
									var indexFattura = fattura.indexOf('<p:FatturaElettronica ');

									var fattura = fattura.substring(indexFattura, fattura.length);

									var xml = '<?xml version="1.0" encoding="UTF-8"?>';
									var xslt = '<?xml-stylesheet type="text/xsl" href="/xsl/fatturapa_v1.1.xsl"?>';
									var result = util.format('%s \n %s \n %s', xml, xslt, fattura);

									return cb(null, result);	
								});		
	});		 	
}


module.exports = new entityS(Fattura);