'use strict';

module.exports = Ember.Route.extend({
  model: function() {
    return Ember.A(['red', 'yellow', 'blue']);
  }
});