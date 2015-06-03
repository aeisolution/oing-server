var express = require('express');
var router = express.Router();

var auth = require('./auth.js');
var url = require('../config/urlBase');

var upload = require('./upload');
var fatturaS = require('../services/fattura');

// --------- API --------------
var apiCircolare = require('./api/circolare');
var apiCommissione = require('./api/commissione');
var apiConsiglioD = require('./api/consiglioDisciplina');
var apiConsiglioT = require('./api/consiglioTerritorio');
var apiConvenzione = require('./api/convenzione');
var apiEventoF = require('./api/eventoFormativo');
var apiFattura = require('./api/fattura');
var apiFile = require('./api/file');
var apiIngegnere = require('./api/ingegnere');
var apiNorma = require('./api/norma');
var apiNotizia = require('./api/notizia');
var apiPagina = require('./api/pagina');
var apiUser = require('./api/user');

var apiParams = require('./api/params');


/*
 * Routes that can be accessed by any one
 */
router.post('/login', auth.login);

//test senza autenticazione

router.get('/fattura/:id/preview', function(req, res) {
	var id = req.params.id || 0;

	fatturaS.preview(id, function(err, data) {
		if(err) { return res.status(400).end(); } 
		if(!data) { return res.status(404).end(); }

		res.contentType('application/xml');		
		return res.send(data);
	});
});
/*
 * Routes that can be accessed only by authenticated & authorized users
 */
//router.get('/api/v1/admin/users', user.getAll);

router.use('/api/v1/upload', upload);

/*
 * Routes that can be accessed by every authenticated users
 */

apiCircolare	.applyRoutes(router);
apiCommissione.applyRoutes(router);
apiConsiglioD	.applyRoutes(router);
apiConsiglioT	.applyRoutes(router);
apiConvenzione.applyRoutes(router);
apiEventoF		.applyRoutes(router);
apiFattura		.applyRoutes(router);
apiFile				.applyRoutes(router);
apiIngegnere	.applyRoutes(router);
apiNorma			.applyRoutes(router);
apiNotizia		.applyRoutes(router);
apiPagina			.applyRoutes(router);
apiUser				.applyRoutes(router);

//Settagglio Parametri
for (var prop in apiParams) {
	apiParams[prop].applyRoutes(router);
}



module.exports = router;
