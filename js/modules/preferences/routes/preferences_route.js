'use strict';

module.exports = Ember.Route.extend({
  model: function () {
    return Ember.A(['haha', 'zach']);
  },

  afterModel: function(preferences, transition) {
    debugger;
    this.transitionTo('files');
  }
});