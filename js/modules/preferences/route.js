'use strict';

module.exports = Ember.Route.extend({
  setupController: function (a, b) {
    this.set('model', Ember.A(['haha', 'zach']));
  },

  model: function () {
    return Ember.A(['haha', 'zach']);
  }
});
