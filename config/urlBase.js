//var urlHost = 'http://api.xxxxxxxxxxxx.net';
var urlHost = 'http://127.0.0.1:3000';
var urlApi = '/api/v1';

var urlBase = {
	host: urlHost,
	api: urlApi,
	path:	urlHost + urlApi,
	uploadPath: 'D:/test/',
	uploadUrl: urlApi + '/download'
}

module.exports = urlBase;