var db = require('../config/db.js');
var Schema = db.Schema;

// common Objects or Schemas
var logObj = require('./common/log');
var allegatoSchema = require('./common/allegato');

var paginaSchema = new Schema({
	codice:					String,
	titolo:					{type: String, required: true},
	descrizione:		String,
	contenuto:			String,
	note:						String,
	allegati:				[allegatoSchema],
	log:						logObj,
	deleted:				{type:Boolean, required: true, default: false}
}, { collection: 'pagine' });

module.exports = db.model('Pagina', paginaSchema);