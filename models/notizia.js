var db = require('../config/db.js');
var Schema = db.Schema;

var allegatoSchema = require('./common/allegato');

var notiziaSchema = new Schema({
	data:						{type: Date, required: true, default: Date.now },
	codice:					String,
	titolo:					{type: String, required: true},
	autore:					String,
	descrizione:		String,
	contenuto:			String,
	link:						String,
	allegati:				[allegatoSchema],
	note:						String
}, { collection: 'notizie' });

module.exports = db.model('Notizia', notiziaSchema);