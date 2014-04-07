/**
 * User: sirzach
 * Date: 4/6/14
 * Time: 9:41 PM
 */
'use strict';

module.exports = Ember.Component.extend({
  didInsertElement: function () {
    var event = this.get('event');
    this.$().css({
      left: event.pageX,
      top: event.pageY
    });
  },

  actions: {
    close: function () {
      this.sendAction('close');
    },

    open: function (file) {
      this.sendAction('open', file);
    }
  }
});