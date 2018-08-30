//
import Route from "@ember/routing/route";


//
export default Route.extend({

  //
  title: "Tacos Map",

  //
  model() {

    //
    let sightings = this.store.findAll("sighting", {
      reload: true
    }).then((sightings) => {

      //  Add extra geo attributes
      sightings.forEach((sighting) => {

        //
        sighting.set("location_geo_array", [
          sighting.get("location_latitude"),
          sighting.get("location_longitude")
        ]);
        //console.log("Sighting:", sighting);
      });

      //  Sort
      return sightings;
    });

    //
    return sightings;
  },

  //
  setupController(controller, model) {
    this._super(...arguments);
    console.log("routes/tacos/map.js :: setupController: ", model);
    controller.set("model", model);
  }
});