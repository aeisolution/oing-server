var db = require('../../config/db.js');
var Schema = db.Schema;

var allegatoSchema = new Schema({
	titolo:					{type: String, required: true},
	descrizione:		String,
	path:						{type: String, required: true},
	type:						String,
	size:						Number
});

module.exports = allegatoSchema;