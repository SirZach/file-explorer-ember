'use strict';

var localStorage = global.window.localStorage,
    Storage = global.window.Storage;

//local storage does not natively support being able to store and retrieve objects, only primitive values
Storage.prototype.setObject = function(key, value) {
  this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObject = function(key) {
  var value = this.getItem(key);
  return value && JSON.parse(value);
};

module.exports = Ember.Route.extend({
  model: function () {
    return Ember.Object.create(localStorage.getObject('preferences'));
  },

  afterModel: function (preferences, transition) {
    this.transitionTo('files');
  },

  actions: {
    /**
     * Set the preferenecs object on local storage to whatever is the latest on the controller
     */
    updatePreferences: function () {
      localStorage.setObject('preferences', this.get('controller.preferences'));
    }
  }
});
