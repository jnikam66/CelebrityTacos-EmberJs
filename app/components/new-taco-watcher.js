/*global Ember*/

//
import Component from "@ember/component";
import {
  computed,
  observer
} from "@ember/object";

//
export default Component.extend({

  //
  store: Ember.inject.service("store"),

  //
  lastSightingID_gotFirstValue: false,
  foundChange: false,

  //
  lastSightingID_promise: computed(function() {

    //
    console.log("Inside watcher::lastSightingID_promise");

    //
    let p = this.get("store").findRecord("global", "lastSightingID", {
      reload: true
    });
    p.then(( /* data */ ) => {

      //console.log("method1", data.get("value"));
      //this.set("method1_data", data.get("value"));
    });

    return p;
  }),
  lastSightingID: computed("lastSightingID_promise.value", function() {
    return this.get("lastSightingID_promise").get("value");
  }),
  lastSightingIDChanged: observer("lastSightingID", function() {

    //
    //console.log("Last sighting ID has changed:", this.get("lastSightingID"));

    //
    if (this.get("lastSightingID_gotFirstValue") === false) {
      this.set("lastSightingID_gotFirstValue", true);
      return;
    }
    this.set("foundChange", true);

    //
    //console.log("Want to show the taco alert icon!");
  }),

  //  Actions yaaaay
  actions: {

    //
    showTacoAlert() {

      //
      let $waiting = Ember.$("[data-element-role=taco-alert-waiting]");
      $waiting.hide(250, () => {

        //
        this.set("foundChange", false);

        //
        let $alert = Ember.$("[data-image-role=taco-alert]");
        $alert.hide(() => {

          //
          console.log("Width:", $alert.width());

          //
          $alert.css({
            "left": -$alert.width(),
            "top": (Ember.$(window).height() - $alert.height()) / 2
          });
          $alert.show();

          //  Begin playing the taco-alert sound! <3
          let $sound = Ember.$("[data-audio-role=taco-alert-audio]").first();
          $sound[0].play();

          //  Begin showing the taco-alert animation
          $alert.animate({
            "left": Ember.$(document).width()
          }, 10000, "swing", () => {
            $alert.hide();
            Ember.$("[data-anchor-role=taco-alert-sighting-link]").click();
          });
        });
      });
    }
  }
});