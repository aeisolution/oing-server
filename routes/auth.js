var jwt = require('jwt-simple');

var crypto = require('crypto');
var User = require('../models/user').user;

var auth = {

  login: function(req, res) {

    var username = req.body.username || '';
    var password = req.body.password || '';

    if (username == '' || password == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }

		auth.validate(username, password)
			.then(
				function(dbUserObj) {
					
					if (!dbUserObj) { // If authentication fails, we send a 401 back
						res.status(401);
						res.json({
							"status": 401,
							"message": "Invalid credentials"
						});
						return;
					}

					if (dbUserObj) {
						res.json(genToken(dbUserObj));
					}
				
				},
				function(err) {
					res.status(401);
					res.json({
						"status": 401,
						"message": "Invalid credentials"
					});
					return;
				});		

  },

  validate: function(username, password) {
		var checksum = crypto.createHash('sha1');
		checksum.update(password);
		var pwd_hash = checksum.digest('hex');


		var objFilter = {username: username, password: pwd_hash };
		return User.findOne(objFilter,{_id: 0, name:1, role:1, username:1})
			.exec(function(err, dbUserObj) {
				if(err) { return err; }
				return dbUserObj;
			});
  },

  validateUser: function(username) {
		var objFilter = { username: username };
		return User.findOne(objFilter,{_id: 0, name:1, role:1, username:1})
			.exec(function(err, dbUserObj) {
				if(err) { return err; }
				return dbUserObj;
			});
  },
}

// private method
function genToken(user) {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires
  }, require('../config/secret')());

  return {
    token: token,
    expires: expires,
    user: user
  };
}

function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = auth;
