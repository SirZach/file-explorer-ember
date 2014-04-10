/**
 * User: sirzach
 * Date: 4/9/14
 * Time: 10:56 PM
 */

'use strict';

module.exports = Ember.ObjectController.extend({
  didCanShowHiddenChange: Ember.observer('canShowHidden', function () {
    //for some strange reason, the action handler on the route is not available when the content of
    //the controller loads so this bombs
    try {
      this.send('updatePreferences')
    } catch (e) {}
  }),

  /**
   * The model representation of what 'content' would be
   */
  preferences: Ember.computed('canShowHidden', function () {
    return {
      canShowHidden: this.get('canShowHidden')
    }
  })
});