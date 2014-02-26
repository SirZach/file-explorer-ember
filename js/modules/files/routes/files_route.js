'use strict';

var fs = require('fs'),
    path = require('path'),
    File = require('../models/file_model');

function getUserHome() {
  return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
}

module.exports = Ember.Route.extend({
  model: function () {
    var filesPromise = new Ember.RSVP.Promise(function (resolve, reject) {

      process.chdir(getUserHome());
      fs.readdir(getUserHome(), function (error, files) {
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
          name: file,
          filePath: path.join(file)
        }));
      });

      return ret;
    });
  },

  setupController: function (controller) {
    this._super.apply(this, arguments);
    controller.set('currentDirectory', getUserHome());
  },

  renderTemplate: function () {
    this._super.apply(this, arguments);

    this.render('addressbar', {
      into: 'files',
      outlet: 'addressbar',
      controller: 'files'
    });
  },

  actions: {
    openPreview : function (file) {
      this.transitionTo('file.preview', file);
    }
  }
});

