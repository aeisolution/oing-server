var db = require('../config/db.js');
var Schema = db.Schema;

//****************************************
// FILE UNICO PER GESTIONE PARAMETRI
//****************************************

// ---------------------------------------
// Laurea
var laureaSchema = new Schema({
	codice:					String,
	nome:					{type: String, required: true},
}, { collection: 'p_lauree' });

module.exports.laurea = db.model('P_laurea', laureaSchema);

// ---------------------------------------
// Categoria
var categoriaSchema = new Schema({
	codice:					String,
	nome:					{type: String, required: true},
}, { collection: 'p_categorie' });

module.exports.categoria = db.model('P_categoria', categoriaSchema);

// ---------------------------------------
// Documento
var documentoSchema = new Schema({
	codice:					String,
	nome:					{type: String, required: true},
}, { collection: 'p_documenti' });

module.exports.documento = db.model('P_documento', documentoSchema);

// ---------------------------------------
// Ruolo Consiglio
var ruoloConsiglioSchema = new Schema({
	codice:					Number,
	nome:					{type: String, required: true},
}, { collection: 'p_ruoliConsiglio' });

module.exports.ruoloConsiglio = db.model('P_ruoloConsiglio', ruoloConsiglioSchema);

// ---------------------------------------
// Ruolo Commissione
var ruoloCommissioneSchema = new Schema({
	codice:					Number,
	nome:					{type: String, required: true},
}, { collection: 'p_ruoliCommissione' });

module.exports.ruoloCommissione = db.model('P_ruoloCommissione', ruoloCommissioneSchema);

// ---------------------------------------
// Settore
var settoreSchema = new Schema({
	nome:					{type: String, required: true},
}, { collection: 'p_settori' });

module.exports.settore = db.model('P_settore', settoreSchema);


// ---------------------------------------
// Tag
var tagSchema = new Schema({
	nome:					{type: String, required: true},
}, { collection: 'p_tags' });

module.exports.tag = db.model('P_tag', tagSchema);