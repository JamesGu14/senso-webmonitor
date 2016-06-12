'use strict';

const Confidence = require('confidence');
const Config = require('./');

/**
 * Criteria is passed to the document and can be used to select the correct
 * value from the options. See: https://github.com/hapijs/confidence#filters
 * @type {Object}
 */
const criteria = {
  env: process.env.NODE_ENV
};

/**
 * The manifest document is passed directly to the Glue module and is
 * the contract by which the server is built.
 * @type {Object}
 */
const manifest = {
  $meta: 'This document contains server level configuration.',
  connections: [{
    port: Config.get('/port/api'),
    labels: ['api']
  }],
  registrations: [
    {
      plugin: {
        register: 'lout',
        options: {
          apiVersion: Config.get('/version')
        }
      },
      options: {}
    },
    {
      plugin: 'inert',
      options: {}
    },
    {
      plugin: 'vision',
      options: {}
    },
    {
      plugin: './server/api/',
      options: {}
    }
  ]
};


const store = new Confidence.Store(manifest);


exports.get = function(key) {

  return store.get(key, criteria);
};


exports.meta = function(key) {

  return store.meta(key, criteria);
};
