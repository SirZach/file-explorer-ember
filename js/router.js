'use strict';

var Router = Ember.Router.extend({

});

Router.map(function () {
  this.resource('files');
  this.resource('preferences');
  this.resource('preview');
  this.resource('addressBar');
});

module.exports = Router;