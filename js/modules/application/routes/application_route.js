/**
 * User: sirzach
 * Date: 4/6/14
 * Time: 9:30 PM
 */
'use strict';

module.exports = Ember.Route.extend({
  actions: {
    openContextMenu: function (file) {
      if (!file.get('isDirectory')) {
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
    }
  }
});