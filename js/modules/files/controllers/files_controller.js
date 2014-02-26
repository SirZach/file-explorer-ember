/**
 * User: sirzach
 * Date: 2/26/14
 * Time: 8:41 AM
 */

'use strict';

module.exports = Ember.ArrayController.extend({
  directories: Ember.computed('currentDirectory', function () {
    var currentDirectory = this.get('currentDirectory');

    if (!currentDirectory) {
      return Ember.A([]);
    }

    var ret = [],
        directories = currentDirectory.split('/'),
        dirInLoop = '';

    for (var i = 0; i < directories.length; i++) {
      dirInLoop += directories[i] + '/';
      var currentDir = {
        name: directories[i],
        directory: dirInLoop,
        class: ''
      };

      if (i === directories.length - 1) {
        currentDir.class = "active";
      }

      ret.push(currentDir);
    }

    return Ember.A(ret);
  })
});