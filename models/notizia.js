var db = require('../config/db.js');
var Schema = db.Schema;

// common Objects or Schemas
var logObj = require('./common/log');
var allegatoSchema = require('./common/allegato');

var notiziaSchema = new Schema({
	data:						{type: Date, required: true, default: Date.now },
	titolo:					{type: String, required: true},
	autore:					String,
	descrizione:		String,
	contenuto:			String,
	link:						String,
	allegati:				[allegatoSchema],
	note:						String,
	log:						logObj,
	deleted:				{type:Boolean, required: true, default: false}
}, { collection: 'notizie' });

module.exports = db.model('Notizia', notiziaSchema);