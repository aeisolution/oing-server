var db = require('../config/db.js');
var Schema = db.Schema;

// ***** USER *****
var userSchema = new Schema({
	dtInsert:				{type: Date, required: true, default: Date.now },
	name: 					{type: String, required: true},
	mail:						{type: String, required: true},
	role:						{type: String, required: true, default: 'user' },
	username:				{type: String, required: true},
	password:				{type: String, required: true, default: 'nuova Password'},
	active:					Boolean
}, { collection: 'users' });


module.exports.user = db.model('User', userSchema);

// ***** USER RESET *****
var userResetSchema = new Schema({
	dtInsert:				{type: Date, required: true, default: Date.now },
	dtUpdate:				{type: Date, required: true, default: Date.now },
	username:				{type: String, required: true},
	mail:						{type: String, required: true},
	ip:							{type: String, required: true},
	token:					{type: String, required: true},
	status:					{type: String, required: true, default: 'toSend'}
}, { collection: 'users_reset' });

module.exports.reset = db.model('UsersReset', userResetSchema);
