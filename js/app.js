global.Ember = Ember;

var Router = require('./js/router');

var App = Ember.Application.create({
  LOG_TRANSITIONS: true,
  Router: Router
});

global.App = App;

require('./js/modules/preferences/');
require('./js/modules/files/');
require('./js/modules/application');