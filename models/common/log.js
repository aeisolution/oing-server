var logObj = {
	dtInsert: 		{type: Date, require: true, default: Date.now },
	opInsert: 		String,
	dtUpdate: 		Date,
	opUpdate: 		String,
	dtDelete: 		Date, 
	opDelete: 		String
};

module.exports = logObj;