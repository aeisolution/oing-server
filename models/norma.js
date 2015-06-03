var db = require('../config/db.js');
var Schema = db.Schema;

var allegatoSchema = require('./common/allegato');

var normaSchema = new Schema({
	tipo:						{type: String, required: true},
	data:						{type: Date, required: true },
	numero:					Number,
	oggetto:				{type: String, required: true},	
	gazzetta:				String,
	link:						String,
	allegati:				[allegatoSchema],
	note:						String
}, { collection: 'norme' });

module.exports = db.model('Norma', normaSchema);