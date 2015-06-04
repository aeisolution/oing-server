var db = require('../config/db.js');
var Schema = db.Schema;

// common Objects or Schemas
var logObj = require('./common/log');
var allegatoSchema = require('./common/allegato');

var normaSchema = new Schema({
	tipo:						{type: String, required: true},
	data:						{type: Date, required: true },
	numero:					Number,
	oggetto:				{type: String, required: true},	
	gazzetta:				String,
	link:						String,
	allegati:				[allegatoSchema],
	note:						String,
	log:						logObj,
	deleted:				{type:Boolean, required: true, default: false}
}, { collection: 'norme' });

module.exports = db.model('Norma', normaSchema);