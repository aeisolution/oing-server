var db = require('../config/db.js');
var Schema = db.Schema;

// common Objects or Schemas
var logObj = require('./common/log');

var componenteSchema = new Schema({
	nominativo: 		{type: String, required: true},
	ruolo:					{type: String, required: true, default: 'componente'},
	dataIscrizione:	{type: Date},
	numero:					Number,
	sezione: 				String
}, { _id: false });

var commissioneSchema = new Schema({
	nome:						{type: String, required: true},
	descrizione:		{type: String, required: true},
	contenuto:			{type: String},
	referente: {
		nominativo:		{type: String, required: true},
		numero:				{type: Number, required: true},
		sezione:			{type: String, required: true}
	},
	componenti:			[componenteSchema],
	note:						String,
	log:						logObj,
	deleted:				{type:Boolean, required: true, default: false}
}, { collection: 'commissioni' });

module.exports = db.model('Commissione', commissioneSchema);