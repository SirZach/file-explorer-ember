/**
 * User: sirzach
 * Date: 4/6/14
 * Time: 9:01 PM
 */
'use strict';

module.exports = Ember.Component.extend({
  tagName: 'li',

  click: function (event) {
    this.sendAction('action', this.get('file'));
  }
});