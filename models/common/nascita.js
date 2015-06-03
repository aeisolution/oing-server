var nascitaObj = {
	data: 			{type: Date, require: true},
	comune: 		{type: String},
	provincia:	{type: String},
	nazione:		{type: String, require: true}
};

module.exports = nascitaObj;