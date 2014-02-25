'use strict';

var fs = require('fs'),
    File = require('../models/file_model');

module.exports = Ember.Route.extend({
  model: function () {
    var filesPromise = new Ember.RSVP.Promise(function (resolve, reject) {

      fs.readdir(process.cwd(), function (error, files) {
        if (error) {
          reject();
        }

        resolve(files);
      });
    });

    return filesPromise.then(function (files) {
      var ret = Ember.A([]);

      files.forEach(function (file) {
        ret.pushObject(File.create({
          name: file
        }));
      });

      return ret;
    });
  },

  renderTemplate: function () {
    this.render('files', {
      into: 'application',
      outlet: 'files'
    });
  }
});

