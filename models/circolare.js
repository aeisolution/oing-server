var db = require('../config/db.js');
var Schema = db.Schema;

var allegatoSchema = require('./common/allegato');

var circolareSchema = new Schema({
	numero:					{type: Number, required: true},
	anno:						{type: Number, required: true},
	oggetto:				{type: String, required: true},
	data:						{type: Date, required: true},
	protocollo:			String,
	descrizione:		String,
	contenuto:			String,
	destinatari: 		[String],
	allegati:				[allegatoSchema],
	note:						String
}, { collection: 'circolari' });

module.exports = db.model('Circolare', circolareSchema);