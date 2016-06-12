'use strict';

const Composer = require('./index');

/**
 * Composer is an instance of the Glue module.
 * By calling this we are asking this module to create our server based on
 * the inputs we have provided (our manifest document). We provide it with a
 * callback here which will be executed when the server is ready to be started.
 */
Composer((err, server) => {
  if (err) {
    throw err;
  }

  // Start listening on given PORT (supplied by manifest)
  return server.start((err) => {

    if (err) {
      throw err;
    }

    server.log(
      ['INFO'],
      `Server started on port ${server.info.port}`
    );
  });
});
