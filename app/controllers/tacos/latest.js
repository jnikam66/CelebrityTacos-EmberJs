
//
import Controller from "@ember/controller";
import { computed } from "@ember/object";

//
export default Controller.extend({

  //
  sightings : computed("model", function(){
    return this.get("model");
  }),

  //
  sortParams: computed("sightings", function(){
    return ["date:desc"];
  }),
  sightings_sorted : computed.sort("sightings", "sortParams")
});
