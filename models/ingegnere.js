var db = require('../config/db.js');
var Schema = db.Schema;

// common Objects or Schemas
var indirizzoObj = require('./common/indirizzo');
var nascitaObj = require('./common/nascita');

var laureaSchema = new Schema({
	codice: 				{type: String},
	titolo:					{type: String, required: true},
	data:						{type: Date, required: true},
	luogo: 					{type: String, required: true},
	voto:				String
}, { _id: false });

var esameStatoSchema = new Schema({
	abilitazione:			String,
	anno: 					{type: Number, required: true},
	luogo: 					{type: String, required: true},
	note:					String
}, { _id: false });


var ingegnereSchema = new Schema({
	nome:						{type: String, required: true},
	cognome:				{type: String, required: true},
	codiceFiscale:	{type: String, required: true},
	nascita: 				nascitaObj,
	residenza:			indirizzoObj,
	ufficio:				indirizzoObj,
	albo: {
		numero:				{type: Number, required: true },
		sezione:			{type: String, required: true },
		iscrizione: 	{
			data:			{type: Date, required: true },
			primaData:		{type: Date, required: true },
			stato:			{type: String, required: true, default: 'iscritto'},
			settori: 		[String]
		}
	},
	recapito: {
		mail: 				String,
		pec:					{type: String, required: true},
		cellulare:		String,
		telefono:		String
	},
	lauree: 				[laureaSchema],
	esamiStato:			[esameStatoSchema],
	note:						String
}, { collection: 'ingegneri' });

module.exports = db.model('Ingegnere', ingegnereSchema);