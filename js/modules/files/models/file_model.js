/**
 * User: sirzach
 * Date: 2/24/14
 * Time: 1:08 AM
 */

'use strict';

var fs = require('fs'),
    path = require('path');

module.exports = Ember.Object.extend({
  /** @property {String} - the name of the file including extension **/
  name: null,

  /** @property {String} - the absolute path to this file on the file system **/
  filePath: null,

  /** @property {String} - the extension of this file **/
  extName: Ember.computed('filePath', function () {
    var filePath = this.get('filePath');

    return path.extname(filePath);
  }),

  /** @property {fs.Stats} what are the fs.Stats of this file? **/
  stats: Ember.computed('filePath', function () {
    var filePath = this.get('filePath');

    return fs.statSync(filePath);
  }),

  /** @property {String} - the associated Font Awesome icon class to the file **/
  icon: Ember.computed('isDirectory', 'isPicture', function () {
    var isDirectory = this.get('isDirectory'),
        isPicture = this.get('isPicture');

    if (isDirectory) {
      return 'fa-folder';
    } else if (isPicture) {
      return 'fa-picture-o';
    } else {
      return 'fa-file-text';
    }
  }),

  /** @property {boolean} - is the file a picture? **/
  isPicture: Ember.computed('extName', function () {
    var extName = this.get('extName');

    switch (extName) {
      case '.jpg':
      case '.gif':
      case '.png':
        return true;
      default :
        return false;
    }
  }),

  /** @property {boolean} - is the file actually a directory? **/
  isDirectory: Ember.computed('stats', function () {
    var stats = this.get('stats');

    return stats.isDirectory();
  }),

  /** @property {boolean} - is the file a system file (starts with a .) */
  isPrivate: Ember.computed('name', function () {
    return this.get('name').charAt(0) === '.';
  })
});