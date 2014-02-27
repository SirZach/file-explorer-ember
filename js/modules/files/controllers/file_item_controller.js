/**
 * User: sirzach
 * Date: 2/27/14
 * Time: 1:54 AM
 */

'use strict';

module.exports = Ember.ObjectController.extend({
  needs: ['preferences'],

  /** @property {boolean} cannot show file if the checkbox for show hidden is not checked and its a private file */
  canShowFile: Ember.computed('controllers.preferences.canShowHidden', function () {
    var canShowHidden = this.get('controllers.preferences.canShowHidden');

    return !canShowHidden && this.get('isPrivate') ? false : true;
  })
});