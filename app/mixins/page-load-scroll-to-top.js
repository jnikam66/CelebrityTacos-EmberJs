
//
import Ember from "ember";

//  Thank you: https://spin.atomicobject.com/2016/06/06/ember-scroll-to-top/
export default Ember.Mixin.create({
  activate: function() {
    this._super();
    window.scrollTo(0,0);
  }
});
