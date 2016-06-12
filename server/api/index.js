'use strict';

const Validation = {
  request: require('../validation/request/')
};

exports.register = (server, options, next) => {

  /**
   * Register the method body here
   */

  /**
   * When page closes
   */
  server.route({
    method: 'GET',
    path: '/{a}',
    handler: function (request, reply) {
      console.log('Received api call: ' + request.params.a);
      reply({ 'data': 'received' })
        .header("Access-Control-Allow-Origin", "*");
    }
  });

  next();
};


exports.register.attributes = {
  name: 'api-index'
};
