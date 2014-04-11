'use strict';

var fs = require('fs'),
    path = require('path'),
    File = require('../models/file_model');

/**
 * Depending on what platform you're on, return the home Path
 * @returns {Path}
 */
function getUserHome() {
  return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
}

/**
 * Returns an array of File models
 * @param obj
 * @returns {Ember.NativeArray|*}
 */
function assembleFiles (obj) {
  var ret = Ember.A([]),
      files = obj.files,
      directory = obj.directory;

  files.forEach(function (file) {
    ret.pushObject(File.create({
      name: file,
      filePath: path.join(directory, file)
    }));
  });

  return ret;
}

/**
 * Get a promise of when the fs can find the files in the passed-in directory
 * @param directory
 * @returns {RSVP.Promise}
 */
function findFilesPromise (directory) {
  var filesPromise = new Ember.RSVP.Promise(function (resolve, reject) {

    process.chdir(directory);
    fs.readdir(directory, function (error, files) {
      if (error) {
        reject();
      }

      resolve({
        files: files,
        directory: directory
      });
    });
  });

  return filesPromise;
}

/**
 * Compiles an array of File Models that are in the current path
 * @param directory
 * @returns {Ember.NativeArray|*}
 */
function getFilesInPath (directory) {
  var directoriesInPath = directory.split('/'),
      filesInPath = Ember.A(),
      dirInLoop = '';

  for (var i = 0; i < directoriesInPath.length; i++) {
    dirInLoop += directoriesInPath[i] + '/';

    filesInPath.pushObject(File.create({
      name: directoriesInPath[i],
      filePath: dirInLoop
    }));
  }

  return filesInPath;
}

module.exports = Ember.Route.extend({
  model: function () {
    var filesPromise = findFilesPromise(getUserHome());

    return filesPromise.then(assembleFiles);
  },

  /**
   * The files controller manually keeps track of the current directory
   * FIXME can this be a computed property of process.cwd()?
   * @param controller
   */
  setupController: function (controller) {
    this._super.apply(this, arguments);
    controller.set('filesInPath', getFilesInPath(getUserHome()));
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
    /**
     * If the file clicked on is a directory, open that directory
     * Else, preview the file
     * @param file
     */
    open: function (file) {
      if (file.get('isDirectory')) {
        this.send('openDir', file.get('filePath'));
      } else {
        this.send('openPreview', file);
      }
    },

    /** @action preview the file */
    openPreview: function (file) {
      this.transitionTo('file.preview', file);
    },

    /** @action set the directory on the controller and retrieve the files in it */
    openDir: function (directory) {
      var filesPromise = findFilesPromise(directory),
          files = filesPromise.then(assembleFiles, function (error) {
            throw error;
          }),
          controller = this.get('controller');

       files.then(function (f) {
         controller.setProperties({
           model: f,
           filesInPath: getFilesInPath(directory)
         });
       });
    }
  }
});

