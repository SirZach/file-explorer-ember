'use strict';

var Router = Ember.Router.extend({

});

Router.map(function () {
  this.resource('preferences', {path: '/'}, function () {
    this.resource('files', function () {
      this.resource('file', {path: '/:name'}, function () {
        this.route('preview');
      });
    });
  });
});

module.exports = Router;