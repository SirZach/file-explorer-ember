/**
 * User: sirzach
 * Date: 2/24/14
 * Time: 1:08 AM
 */

'use strict';

var fs = require('fs');

module.exports = Ember.Object.extend({
  name: null,

  filePath: null,

  stats: Ember.computed('filePath', function () {
    var filePath = this.get('filePath');

    return fs.statSync(filePath);
  }),

  icon: Ember.computed('isDirectory', function () {
    return this.get('isDirectory') ? 'fa-folder' : 'fa-file-text';
  }),

  isDirectory: Ember.computed('stats', function () {
    var stats = this.get('stats');

    return stats.isDirectory();
  })
});