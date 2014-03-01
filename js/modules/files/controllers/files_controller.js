/**
 * User: sirzach
 * Date: 2/26/14
 * Time: 8:41 AM
 */

'use strict';

module.exports = Ember.ArrayController.extend({
  needs: ['preferences'],

  itemController: 'fileItem'
});