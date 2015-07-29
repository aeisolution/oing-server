var mongoose = require('mongoose')
mongoose.connect('mongodb://boot2docker.local:27017/sr-oing');

module.exports = mongoose