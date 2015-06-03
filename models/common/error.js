var err = function() {
	var self = this;
	
	//************************
	//properties
	self.code 				= '';
	self.description 	= '';
	self.details 			= [];
	//************************
	
	
	// init
	self.init = function(code, description) {
		self.code 				= code;
		self.description 	= description;
		self.details			= [];
	};
	
	// detailAdd
	self.detailAdd = function(detail) {
		self.details.push(detail);
	};
	
	// create json Object for response
	self.json = function() {
		var obj = {};
		
		obj.code 				= self.code;
		obj.description = self.description;
		obj.details 		= self.details;
		
		return obj;
	};
	
	
};

module.exports = new err();