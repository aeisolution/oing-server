var db = require('../config/db.js');
var Schema = db.Schema;

var allegatoSchema = require('./common/allegato');

var paginaSchema = new Schema({
	codice:					String,
	titolo:					{type: String, required: true},
	descrizione:		String,
	contenuto:			String,
	note:						String,
	allegati:				[allegatoSchema]
}, { collection: 'pagine' });

module.exports = db.model('Pagina', paginaSchema);