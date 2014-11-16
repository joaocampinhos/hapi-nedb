'use strict';
var Datastore = require('nedb');

exports.register = function (plugin, options, next) {
  var db, collections = {};

  if (!options) {
    options = {};
  }

  db = {
    collection: function (collection) {
      if (!collections[collection]) {
        if (options.directory) {
          options.filename = options.directory + collection + '.nedb';
          options.autoload = true;
        }
        collections[collection] = new Datastore(options);
      }
      return collections[collection];
    }
  };

  plugin.expose('db', db);

  next();
};

exports.register.attributes = {
  pkg: require('../package.json')
};
