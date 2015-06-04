var db = require('../config/db.js');
var Schema = db.Schema;

// common Objects or Schemas
var logObj = require('./common/log');

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
	note:						String,
	log:						logObj,
	deleted:				{type:Boolean, required: true, default: false}
}, { collection: 'consigliTerritorio' });

module.exports = db.model('ConsiglioTerritorio', consiglioTerritorioSchema);