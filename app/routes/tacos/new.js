
//
import Ember from "ember";
import Route from "@ember/routing/route";
import ResetScrollPositionMixin from "../../mixins/page-load-scroll-to-top";

//
export default Route.extend( ResetScrollPositionMixin, {

  //
  title: "Add a New Taco !!!",

  //
  model(){

    //
    return Ember.RSVP.hash({
      celebrities : this.store.findAll("celebrity"),
      tacoTypes : this.store.findAll("tacoType")
    });
  },

  //
  afterModel: function(model, transition) {

    //  Focus on the title input, after the transition is totally complete
    transition.then(function() {
      //Ember.$("input#test-title").focus();
      //console.log("Transition completetetetet");
      //  ^^^ Doesn't work for some reason
    });
  },

  //
  setupController(controller, model) {
    this._super(...arguments);
    controller.set("celebrities", model.celebrities);
    controller.set("tacoTypes", model.tacoTypes);
  }


});
