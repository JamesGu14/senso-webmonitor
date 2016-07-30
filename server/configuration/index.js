'use strict';

const Confidence = require('confidence');
const Pkg = require('../../package.json');

/**
 * Criteria is passed to the document and can be used to select the correct
 * value from the options. See: https://github.com/hapijs/confidence#filters
 * @type {Object}
 */
const criteria = {
  env: process.env.NODE_ENV
};

/**
 * Configuration document for this application
 * @type {Object}
 */
const config = {
  $meta: 'This config file contains application level configuration.',
  projectName: Pkg.name,
  version: Pkg.version,
  port: {
    api: 3001,
    mongodb: 27017
  },
  mongodb: {
    url: 'localhost'
  }
};


const store = new Confidence.Store(config);

/**
 * External method for fetching an item from the document. Combines
 * the request with our criteria document.
 * @param  {string} key Item being requested
 */
exports.get = function(key) {

  return store.get(key, criteria);
};

/**
 * Retrieves meta information where document contains. Combines the request
 * with our predefined criteria.
 * @param  {string} key Item being requested
 */
exports.meta = function(key) {

  return store.meta(key, criteria);
};
