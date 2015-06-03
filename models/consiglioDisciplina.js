var db = require('../config/db.js');
var Schema = db.Schema;

var collegioSchema = new Schema({
	numero: 				{type: Number, required: true},
	presidente:			{type: String, required: true},
	segretario:			{type: String, required: true},
	consigliere:		{type: String, required: true},
	note:						String
}, { _id: false });

var componenteSchema = new Schema({
	nominativo: 		{type: String, required: true},
	ruolo:					{type: String, required: true, default: 'consigliere'},
	numero:					Number,
	sezione: 				String,
	note:						String
}, { _id: false });

var consiglioDisciplinaSchema = new Schema({
	nomina:					{type: Date},
	insediamento:		{type: Date},
	periodo: {
		inizio:				{type: Number, required: true},
		fine:					{type: Number, required: true}
	},
	componenti:			[componenteSchema],
	collegi:				[collegioSchema],
	note:						String
}, { collection: 'consigliDisciplina' });

module.exports = db.model('ConsiglioDisciplina', consiglioDisciplinaSchema);