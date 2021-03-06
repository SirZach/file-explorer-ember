/**
 * User: sirzach
 * Date: 4/6/14
 * Time: 9:30 PM
 */
'use strict';

var Shell = global.window.nwDispatcher.requireNwGui().Shell;

module.exports = Ember.Route.extend({
  actions: {
    openContextMenu: function (file, event) {
      if (!file.get('isDirectory')) {
        this.setProperties({
          'controller.contextMenuFile': file,
          'controller.contextEvent': event
        });
        this.render('context_menu', {
          outlet: 'context-menu',
          into: 'application'
        });
      }
    },

    closeContextMenu: function () {
      this.disconnectOutlet({
        outlet: 'context-menu',
        parentView: 'application'
      });
    },

    openFile: function (file) {
      Shell.openItem(file.get('filePath'));
      this.send('closeContextMenu');
    }
  }
});