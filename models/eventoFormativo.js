var db = require('../config/db.js');
var Schema = db.Schema;

// common Objects or Schemas
var logObj = require('./common/log');
var allegatoSchema = require('./common/allegato');

// common Objects or Schemas
var indirizzoObj = require('./common/indirizzo');

var interventoSchema = new Schema({
	ordine:					{type: Number, required: true, default: 1},
	titolo:					String,
	relatore:				String,
	orario: {
		inizio:				String,
		fine:					String
	},
	note:						String
}, { _id: false });

var calendarioSchema = new Schema({
	ordine:					{type: Number, required: true, default: 1},
	giorno: 				Date,
	titolo:					String,
	orario: {
		inizio:				String,
		fine:					String
	},
	interventi: 		[interventoSchema],
	note:						String
}, { _id: false });

var relatoreSchema = new Schema({
	nominativo: 		{type: String, required: true},
	ruolo:					{type: String, required: true, default: 'docente'},
	note:						String
}, { _id: false });

var eventoFormativoSchema = new Schema({
	codice:					{type: String},
	titolo:					{type: String, required: true},
	tipologia:			{type: String, required: true},
	sede:						indirizzoObj,
	descrizione:		String,
	obiettivi:			String,
	relatori:				[relatoreSchema],
	settori:				[String],
	durata: {
		ore:					Number,
		giornate:			Number
	},
	periodo: 				String,
	calendario:			[calendarioSchema],
	crediti:				Number,
	costoPersona: 	Number,
	destinatari: {
		minimo:				Number,
		massimo:			Number,
		note:					String
	},
	requisiti:			[String],
	allegati:				[allegatoSchema],
	priorita:				String,
	note:						String,
	log:						logObj,
	deleted:				{type:Boolean, required: true, default: false}
}, { collection: 'enventiFormativi' });

module.exports = db.model('EventoFormativo', eventoFormativoSchema);