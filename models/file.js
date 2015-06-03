var db = require('../config/db.js');
var Schema = db.Schema;


var fileSchema = new Schema({
	data:						{type: Date, required: true, default: Date.now},
	titolo:					{type: String, required: true},
	descrizione:		String,
	categoria:			String,
	filename:				{type: String, required: true},
	path:						String,
	type:						String,
	size:						Number
}, { collection: 'files' });

module.exports = db.model('File', fileSchema);