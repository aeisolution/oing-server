var db = require('../config/db.js');
var Schema = db.Schema;

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
	note:						String
}, { collection: 'convenzioni' });

module.exports = db.model('Convenzione', convenzioneSchema);