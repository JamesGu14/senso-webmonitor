'use strict';

const util = require('util');
const Glue = require('glue');
const Manifest = require('./server/configuration/manifest');

const composeOptions = {
  relativeTo: __dirname
};

/**
 * Create the method ready to be called to start the server.
 * This binding does *not* execute compose, but rather stages it for
 * being executed with the manifest document set. From here we can import
 * this module, compose the server and either start listening or run tests.
 */
module.exports = Glue.compose.bind(Glue, Manifest.get('/'), composeOptions);
