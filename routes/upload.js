var formidable = require('formidable'),
		util = require('util'),
		fs   = require('fs-extra');

var express = require('express');
var router = express.Router();

var url = require('../config/urlBase');

// SERVICES 
var fileS = require('../services/file');
var fatturaS = require('../services/fattura');

//----------------------------------
// Post GENERIC FILE
router.post('/', function(req, res) {
	
	var form = new formidable.IncomingForm();
	var ObjFile = {};
	
	form.parse(req, function(err, fields, files) {
		ObjFile.type = files.upload.type;
		ObjFile.size = files.upload.size;
  });
	
	form.on('end', function(fields, files) {
		/* Temporary location of our uploaded file */
		var temp_path = this.openedFiles[0].path;
		/* The file name of the uploaded file */
		var file_name = this.openedFiles[0].name;
		/* Location where we want to copy the uploaded file */
		var unique = Date.now();

		fs.copy(temp_path, url.uploadPath + unique + '_' + file_name, function(err) {  
					
			ObjFile.titolo = file_name;
			ObjFile.filename = unique + '_' + file_name;
			ObjFile.path = url.uploadPath;
			
			if (err) {
				res.status(400).end();
			} else {
				fileS.save(ObjFile, function(err, data) {
					if(err) { 
						return res.status(500).end(); 
					}
				
					return res.json(data);
				});
			}
		});
	});
	return;
});

//----------------------------------
// Post FATTURA ELETTRONICA
router.post('/fattura', function(req, res) {
	
	var form = new formidable.IncomingForm();
	var ObjFile = {};
	
	form.parse(req, function(err, fields, files) {
		ObjFile.type = files.upload.type;
		ObjFile.size = files.upload.size;
  });
	
	form.on('end', function(fields, files) {
		/* Temporary location of our uploaded file */
		var temp_path = this.openedFiles[0].path;
		/* The file name of the uploaded file */
		var file_name = this.openedFiles[0].name;
		/* Location where we want to copy the uploaded file */
		var unique = Date.now();

		fs.copy(temp_path, url.uploadPath + '/fattura/' + unique + '_' + file_name, function(err) {  
					
			ObjFile.titolo = file_name;
			ObjFile.filename = unique + '_' + file_name;
			ObjFile.path = url.uploadPath + '/fattura/';
			
			if (err) {
				res.status(400).end();
			} else {
				fatturaS.save(ObjFile, function(err, data) {
					if(err) { 
						return res.status(500).end(); 
					}
				
					return res.json(data);
				});
			}
		});
	});
	return;
});


module.exports = router;
