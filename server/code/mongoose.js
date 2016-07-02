'use strict';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webmonitor');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected');
});

module.exports = mongoose;