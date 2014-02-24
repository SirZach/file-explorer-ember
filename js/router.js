'use strict';

var Router = Ember.Router.extend({

});

Router.map(function () {
  this.resource('preferences', {path: '/'}, function () {
    this.resource('files', function () {
      this.resource('preview');
    });
  });
//  this.resource('preview');
//  this.resource('addressBar');
});

module.exports = Router;