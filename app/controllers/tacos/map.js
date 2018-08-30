/*global Ember*/

//
import Controller from "@ember/controller";
import {
  computed
} from "@ember/object";

//
export default Controller.extend({

  //
  init: function() {

    //
    this._super(...arguments);
  },

  //  Inject other controllers
  mapIcons: Ember.inject.controller("map-icons"),

  //
  sightings: computed("model", function() {
    return this.get("model");
  }),

  //
  sortParams: computed("sightings", function() {
    return ["date:desc"];
  }),
  sightings_sorted: computed.sort("sightings", "sortParams"),

  //
  calculatedMapCoordinates: computed("model", function() {

    //
    let sightings = this.get("model");
    let lat_sum = 0;
    let lat_min = NaN;
    let lat_max = NaN;
    let lng_sum = 0;
    let lng_min = NaN;
    let lng_max = NaN;
    let count = 0;

    //
    sightings.forEach((sighting) => {

      //
      let lat = sighting.get("location_latitude");
      let lng = sighting.get("location_longitude");

      //
      count = count + 1;
      lat_sum = lat_sum + lat;
      lng_sum = lng_sum + lng;

      //
      if (isNaN(lat_min) || lat < lat_min) {
        lat_min = lat;
      }
      if (isNaN(lat_max) || lat > lat_max) {
        lat_max = lat;
      }
      //
      if (isNaN(lng_min) || lng < lng_min) {
        lng_min = lng;
      }
      if (isNaN(lng_max) || lng > lng_max) {
        lng_max = lng;
      }
    });

    //
    let lat_avg = 0;
    let lng_avg = 0;
    if (count > 0) {
      lat_avg = lat_sum / count;
      lng_avg = lng_sum / count;
    }

    //
    return {
      "average": {
        "latitude": lat_avg,
        "longitude": lng_avg
      },
      minimum: {
        "latitude": lat_min,
        "longitude": lng_min
      },
      maximum: {
        "latitude": lat_max,
        "longitude": lng_max
      }
    };
  })
});