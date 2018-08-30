
/*global Ember*/

//
import Controller from "@ember/controller";
import { computed } from "@ember/object";

//
export default Controller.extend({

  //  Inject the map icons controller
  mapIcons : Ember.inject.controller("map-icons"),

  //
  currentUser : computed("session", function() {

    //
    let sesh = this.get("session");
    if (!sesh) {
      return null;
    }

    //
    let currentUser = sesh.get("currentUser");
    if ( !currentUser ) {
      return null;
    }

    return currentUser;
  }),

  //
  hasGeoCoordinates : computed("model.sighting", function(){

    //
    let model = this.get("model");
    if ( !model ) {
      return false;
    }
    let sighting = model["sighting"];

    //
    if ( sighting ) {
      if ( sighting["location_latitude"] && sighting["location_longitude"]) {
        return true;
      }
    }

    //
    /*
    console.log("Uhm sighting: ", sighting.get("location"));
    console.log("Uhm sighting: ", sighting["location"]);
    console.log("Uhm sighting: ", sighting.location);
    console.log("Uhm sighting: ", sighting);
    console.log("Uhm sighting: ", JSON.stringify(model));
    */

    //
    return false;
  }),

  mapMarkerLocation: computed("model.sighting", function(){

    //
    let model = this.get("model");
    if ( !model ) {
      return [];
    }
    let sighting = model["sighting"];
    if ( !sighting ) {
      return [];
    }

    //
    let toReturn = [
      sighting.get("location_latitude"), sighting.get("location_longitude")
    ];

    //
    console.log(sighting);
    console.log(toReturn);

    return toReturn;
  }),

  //
  comments : computed("model", function(){
    return this.get("model")["comments"];
  }),

  //
  comments_sorted_params: computed("model.comments", function(){
    return ["date:desc"];
  }),
  comments_sorted : computed.sort("model.comments", "comments_sorted_params"),



  //
  actions : {

    //
    showFullDetails() {

      //
      Ember.$("[data-element-role=image-only]").hide(500, function(){

        //
        Ember.$("[data-element-role=full-details]").show(500);
      });
    },

    //
    showImageOnly() {

      //
      Ember.$("[data-element-role=full-details]").hide(500, function(){

        //
        Ember.$("[data-element-role=image-only]").show(500);
      });
    }
  }

});
