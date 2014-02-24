'use strict';

module.exports = Ember.Route.extend({
  model: function () {
    return Ember.A(['red', 'yellow', 'blue']);
  },

  renderTemplate: function () {
    this.render('files', {
      into: 'application',
      outlet: 'files'
    });
  }
});

