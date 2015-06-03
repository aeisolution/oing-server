var apiBase = function(model) {
	var self = this;
	
	self.model = model;
	self.routes = [];
	
	// countAll 
  self.countAll = function(req, res) {
		self.model.countAll(function(err, data) {
				if(err) { return res.status(500).end(); }
				
				return res.json(data);
			});		
  };

	// countAll 
  self.countPage = function(req, res) {
		self.model.countPage(function(err, data) {
				if(err) { return res.status(500).end(); }
				
				return res.json(data);
			});		
  };
	
	// getPage -  elenco 
  self.getPage = function(req, res) {
		var page = req.params.page || 1;
		
		self.model.getPage(page, {}, function(err, data) {
				if(err) { return res.status(500).end(); }
				
				return res.json(data);
			});		
  };
	
	// getAll -  elenco 
  self.getAll = function(req, res) {
		var fields = req.query || {};
				
		self.model.getAll(fields, function(err, data) {		
				if(err) { return res.status(500).end(); }
			
				return res.json(data);
			});		
  };

	// getOneById - dettaglio
	self.getOneById = function(req, res) {
		var id = req.params.id || 0;

		self.model.getOneById(id, function(err, data) {
				if(err) { return res.status(500).end(); }
				if(!data) { return res.status(404).end(); }
				
				return res.json(data);
			});		
  };
	
	// create - creazione record
	self.create = function(req, res) {
		self.model.save(req.body, function(err, data) {
			if(err) {
				console.log('error post');
				console.dir(err);
				return res.status(500).json(err); 
			} 

			return res.status(201).json(data);	
		});
  };
	
	// create - creazione record
	self.update = function(req, res) {		
		var id = req.params.id || 0;
		var obj = req.body;
		
		self.model.update(id, req.body, function(err, data) {
			if(err) { return res.status(500).end(); } 

			return res.status(204).end();	
		});
  };

	self.delete = function(req, res) {		
		var id = req.params.id || 0;
		
		self.model.delete(id, function(err, data) {
			if(err) { return res.status(400).end(); } 
			if(!data) { return res.status(404).end(); }
			
			return res.status(204).end();	
		});
  };
	
	//---------------------------------------
	// Metodi estensione servizio base
	//---------------------------------------

	self.setRoutes = function(routes) {
		if(routes) {
			for(var i=0,len=routes.length;i<len;i++) {
				self.routes.push({verb: routes[i].verb, path: routes[i].path, method: routes[i].method});
			}
		}
	};
	
	self.applyRoutes = function(router) {
		for(var i=0,len=self.routes.length;i<len;i++) {
			if(self.routes[i].verb==='get') {
				router.get(self.routes[i].path, self.routes[i].method);
			} else if(self.routes[i].verb==='post') {
				router.post(self.routes[i].path, self.routes[i].method);
			} else if(self.routes[i].verb==='put') {
				router.put(self.routes[i].path, self.routes[i].method);
			} else if(self.routes[i].verb==='delete') {
				router.delete(self.routes[i].path, self.routes[i].method);
			}
		}
	};
};

module.exports = apiBase;