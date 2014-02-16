'use strict';

module.exports = Ember.Route.extend({
  renderTemplate: function () {
    this.render();

    this.render('preferences', {
      outlet: 'preferences',
      controller: 'preferences'
    });


  },

  model: function () {
    return Ember.A(['red', 'yellow', 'blue']);
  }
});