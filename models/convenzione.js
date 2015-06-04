var db = require('../config/db.js');
var Schema = db.Schema;

// common Objects or Schemas
var logObj = require('./common/log');
var allegatoSchema = require('./common/allegato');

// common Objects or Schemas
var indirizzoObj = require('./common/indirizzo');

var convenzioneSchema = new Schema({
	oggetto:				{type: String, required: true},
	fornitore: {
		ragioneSociale:	{type: String, required: true},
		partitaIva:			String,
		codiceFiscale:	String,
		sede:						indirizzoObj,
		telefono:				String,
		mail:						String,
		sitoWeb:				String
	},
	descrizione:		String,
	categoria:			String,
	periodo:	{
		stipula:			String,
		scadenza:			String,
		rinnovo:			String
	},
	destinatari: 		String,
	requisiti:			[String],
	allegati:				[allegatoSchema],
	note:						String,
	log:						logObj,
	deleted:				{type:Boolean, required: true, default: false}
}, { collection: 'convenzioni' });

module.exports = db.model('Convenzione', convenzioneSchema);