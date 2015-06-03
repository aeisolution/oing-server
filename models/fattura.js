var db = require('../config/db.js');
var Schema = db.Schema;


var fatturaSchema = new Schema({
	data:						{type: Date, required: true, default: Date.now},
	titolo:					{type: String, required: true},
	descrizione:		String,
	filename:				{type: String, required: true},
	path:						{type: String, required: true},
	type:						{type: String, required: true},
	size:						{type: Number, required: true, default: 0}
}, { collection: 'fatture' });

module.exports = db.model('Fattura', fatturaSchema);