/**
 * User: sirzach
 * Date: 2/25/14
 * Time: 8:17 AM
 */

'use strict';

module.exports = Ember.Route.extend({
  model: function (params) {
    return this.modelFor('file');
  }
});