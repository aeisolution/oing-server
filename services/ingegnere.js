// MODELS USED
var Ingegnere = require('../models/ingegnere');

// SERVICES 
var entityS = require('./entity');

 
/* --------------------------------------------------------------
	Metodi CRUD base per oggetto già implementati da entity Service
	---------------------------------------------------------------
	
	Metodi Specifici per documento/oggetto Commissione:
	1. 
	
	nota. Si ipotizza considera che un iscritto potrà essere inserito 
	una sola volta come componente. Pertanto l'identificazione sarà 
	effettuata mediante utilizzo di numero e sezione di iscrizione
*/

// PROTOTYPES

// ------------------------------
// 1. 


module.exports = new entityS(Ingegnere);