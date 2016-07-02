'use strict';

const Joi = require('joi');
var user_app = require('../code/models').user_app;
var app_visit = require('../code/models').app_visit;
var util = require('util');

const Validation = {
  request: require('../validation/request/')
};

exports.register = (server, options, next) => {

  /**
   * Register the method body here
   */

  server.route({
    method: 'GET',
    path: '/test',
    handler: function(request, reply) {
      console.log('user ip: ' + request.info.remoteAddress);
      console.log('');
      reply({}).header("Access-Control-Allow-Origin", "*");
    }
  });
  
  server.route({
    method: 'POST',
    path: '/test',
    handler: function(request, reply) {
      console.log('user ip: ' + request.info.remoteAddress);
      console.log('');
      reply({}).header("Access-Control-Allow-Origin", "*");
    }
  })

  /**
   * Create app_visit 'open' record
   */
  server.route({
    method: 'POST',
    path: '/visit',
    config: {
      description: 'capture user visit action',
      validate: {
        payload: {
          appid: Joi.string().required(),
          api_key: Joi.string().required(),
          rand_uuid: Joi.string(),
          url: Joi.string().required(),
        }
      },
      handler: function (request, reply) {
        
        // Validate api_key first 
        var _now = new Date();
        var _api_key = request.payload.api_key;
        var _app_id = request.payload.appid;
        var _rand_uuid = request.payload.rand_uuid;
        var _user_ip = request.info.remoteAddress;
        var _url = request.payload.url;
        user_app.findOne({ '_id': _app_id, 'api_key': _api_key }, function(err, _user_app) {
          
          if(err) {
            
            console.log('API Key verification failed due to err: ' + err);
          } else {
            
            // Create a app_visit record
            const req = request.raw.req;
            var user_agent = req.headers['user-agent'];
            if(_user_app && _user_app._id != null) {
              
              var _visit = new app_visit({
                appid: _user_app._id,
                rand_uuid: _rand_uuid,
                user_ip: _user_ip,
                url: _url,
                device: user_agent,
                broswer: '',
                action: 'open',
                time: _now,
                api_key: _api_key 
              });
              
              _visit.save(function(err, _visit) {
                if(err) console.log(err);
                console.log('App visit saved successfully');
              });
            } else {
              
              /**
               * TODO: log failed authenticated API key and value
               * save this value to MongoDB for future analytical purposes 
               */
            }
          }
        });
        
        reply({});
      }
    }
  });
  
  /**
   * Create app_visit 'leave' record
   */
  server.route({
    method: 'GET',
    path: '/leave/{uuid}',
    config: {
      description: 'capture user leave action',
      handler: function(request, reply) {
        
        var _now = new Date();
        var _uuid = encodeURIComponent(request.params.uuid);
        console.log('captured leave action: ' + _uuid);
        app_visit.findOne({ 'rand_uuid': _uuid }, function(err, _app_visit) {
          
          if(err) {
            
            console.log('Database connection issue');
          } else {
            
            if(_app_visit && _app_visit._id != null) {
              
              console.log('Not null');
              // Save a leave record in database
              var _visit = new app_visit({
                appid: _app_visit.appid,
                rand_uuid: _app_visit.rand_uuid,
                user_ip: _app_visit.user_ip,
                url: _app_visit.url,
                device: _app_visit.device,
                broswer: _app_visit.broswer,
                action: 'leave',
                time: _now,
                api_key: _app_visit.api_key 
              });
              
              _visit.save(function(err, _visit) {
                if(err) console.log(err);
                console.log('App visit saved successfully');
              });
            }
          }
        });
        
        reply({}); 
      }
    }
  })
  
  next();
};

exports.register.attributes = {
  name: 'api-index'
};
