var db = require('../config/db.js');
var Schema = db.Schema;

var componenteSchema = new Schema({
	nominativo: 		{type: String, required: true},
	ruolo:					{type: String, required: true, default: 'consigliere'},
	numero:					Number,
	sezione: 				String,
	note:						String
}, { _id: false });

var consiglioTerritorioSchema = new Schema({
	elezione:				{type: Date},
	insediamento:		{type: Date},
	periodo: {
		inizio:				{type: Number, required: true},
		fine:					{type: Number, required: true}
	},
	componenti:			[componenteSchema],
	note:						String
}, { collection: 'consigliTerritorio' });

module.exports = db.model('ConsiglioTerritorio', consiglioTerritorioSchema);