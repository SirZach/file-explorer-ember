'use strict';

module.exports = Ember.Route.extend({
  model: function () {
    return Ember.Object.create({
      canShowHidden: true
    });
  },

  afterModel: function(preferences, transition) {
    this.transitionTo('files');
  }
});
