// services/entity.js

/*
	Serv izio base per gestione entity
*/

//var error = require('../models/common/error');

var entityService = function(model) {
	var self = this;
	
	self.entity = model;
	self.pageRecords = 5;
	
	//*********************
	// COUNT

	// --- count Records ----------------------
	
	// countAll
	self.countAll = function(cb) {
		self.countAllByFilter({}, cb);
	};

	// countAllByFilter
	self.countAllByFilter = function(filter, cb) {
		self.entity.count(filter, function(err, count){
			if(err) { return cb(err); }

			return cb(null, count);		
		});
	};	

	// --- count Pages ----------------------

	// countPage
	self.countPage = function(cb) {
		self.countPageByFilter({}, cb);
	};	

	
	// countPageByFilter
	self.countPageByFilter = function(filter, cb) {
		self.countAllByFilter(filter, function(err, count) {
			if(err) { return cb(err); }
			
			var pages = Math.floor(count / self.pageRecords);

			if(count % self.pageRecords > 0) {
				pages++;
			} 
			return cb(null, pages); 
			
		});
	};
	
	
	//*********************
	// GET
	
	// -- All --------------
	
	// getAll
	self.getAll = function(fields, cb) {
		self.getAllByFilter({ deleted: false }, fields, cb);
	};

	// getAllByFilter
	self.getAllByFilter = function(filter, fields, cb) {
		
		if(!filter) {
			filter = { deleted: false };
		} else {
			filter.deleted = false;
		}
		
		self.entity.find(filter, fields)
			.exec(function(err, data) {
				if(err) { return cb(err); }
				
				return cb(null, data);
		});
	};
	
	// -- Page --------------
	
	// getPage
	self.getPage = function(page, fields, cb) {
		self.getPageByFilter(page, {}, fields, cb);
	};
	
	// getPageByFilter
	self.getPageByFilter = function(page, filter, fields, cb) {
		if(!page || page<1) { page = 1; }
		
		self.entity.find(filter, fields)
			.limit(self.pageRecords)
			.skip((page-1) * self.pageRecords)
			.exec(function(err, data) {
				if(err) { return cb(err); }
				
				return cb(null, data);
		});
	};

	// -- Top --------------
	
	// getTop
	self.getTop = function(num, fields, cb) {
		if(!num || num<1) { num = 1; }
		
		self.entity.find(fields)
			.limit(self.num)
			.exec(function(err, data) {
				if(err) { return cb(err); }
				
				return cb(null, data);
		});
	};
	
	// -- One --------------
	
	// getOneById
	self.getOneById = function(id, cb) {
		self.entity.findById(id)
			.exec(function(err, data) {
				if(err) { return cb(err); }
				
				return cb(null, data);
		});
	};
	
	//*********************
	// POST

	// create
	self.save = function(obj, cb) {
		var item = new self.entity(obj);
		
		// creazione item valido
		item.save(function(err, data) {
			if(err) { return cb(err); }

			return cb(null, data);
		});
			
	};
		
	
	//*********************
	// UPDATE
	
	// update
	self.update = function(id, obj, cb) {
		console.log('entity update');
		var item = new self.entity(obj);
		
		self.validate(item, function (err) {
  		if(err) { return cb(err); }
			
			// creazione item valido
			self.entity.findByIdAndUpdate(id, obj, { new: true }, function(err, data) {
				if(err) { return cb(err); }

				return cb(null, data);
			});
		});
	};	
	
	//*********************
	// DELETE
	
	// delete
	self.delete = function(id, cb) {
		/*
		self.entity.findByIdAndRemove(id, function(err, data) {
			if(err) { return cb(err); }

			return cb(null, data);
		});
		*/

		//Cancellazione sostituita con bit deleted=true
		var dt = Date.now;
		self.entity.findByIdAndUpdate(id, { deleted: true }, { new: true }, function(err, data) {
			if(err) { return cb(err); }

			return cb(null, data);
		});
		
		
	};
	
	//*********************
	// VALIDATE MODEL
	
	// delete
	self.validate = function(item, cb) {
		item.validate(function(err) {
			if(err) { return cb(err); }

			return cb();
		});
	};
	
	
};

module.exports = entityService;