'use strict';

var mongoose = require('../code/mongoose');

/**
 * sys_user model, dashboard users
 * registered accounts or OAuth accounts
 */
var sys_userSchema = mongoose.Schema({
    username: {type: String, required: true },
    password: {type: String, required: true },
    source: String,
    reg_time: Date,
    user_rating: {
        type: Number,
        min: 0,
        max: 10
    }
});

var sys_user = mongoose.model('sys_user', sys_userSchema)
module.exports.sys_user = sys_user;

// Save function
module.exports.save_sys_user = function(sys_user) {
    // Think if we need to do this

}

/**
 * user_app model, one sys_user may have 0 - * apps
 * each app has a unique key
 */
var user_appSchema = mongoose.Schema({
    userid: mongoose.Schema.Types.ObjectId,
    app_name: {type: String, required: true },
    app_url: {type: String, required: true },
    api_key: {type: String, required: true },
    start_time: Date,
    end_time: Date,
    is_canceled: {
        type: Boolean,
        default: false
    }
});

module.exports.user_app = mongoose.model('user_app', user_appSchema);

/**
 * app_log model
 * rand_uuid: generated at client side as a uniq identifier
 * device: what device the client is using
 * broswer: what browser the client is using
 * action: open / leave
 * time: action happened time
 * api_key: [Important] when client visit a page with this API, indicates wether the web belongs to the applied webmaster
 *          later on need to check whether a webmaster's api_key same with the api_key here
 *          if not equal, may be an invalid key or user.
 */

var app_visitSchema = mongoose.Schema({
  appid: mongoose.Schema.Types.ObjectId,
  rand_uuid: String,
  url: {type: String, required: true },
  user_ip: {type: String, required: true },
  device: String,
  broswer: String,
  action: {type: String, required: true },
  time: Date,
  api_key: {type: String, required: true }
});

module.exports.app_visit = mongoose.model('app_visit', app_visitSchema);