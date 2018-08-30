/*global Ember*/

//
import Route from "@ember/routing/route";
//import EmberObject from "@ember/object";
import ResetScrollPositionMixin from "../../mixins/page-load-scroll-to-top";

//
export default Route.extend(ResetScrollPositionMixin, {

  //
  model(params) {

    //
    let to_return = {
      "sighting_notFound": false
    };
    //console.log("View Taco::Params", params);

    //  Load the sighting
    let sighting = this.store.findRecord("sighting", params.sighting_id);
    sighting.catch(( /* error */ ) => {

      //
      console.log("Unable to load the sighting");
      Ember.set(to_return, "sighting_notFound", true);
    });
    //console.log("Sighting: ", sighting);

    //  Load its comments, if any
    let comments = this.store.query("sighting-comment", {
      orderBy: "sighting_id",
      equalTo: params.sighting_id
    });

    //
    to_return["sighting"] = sighting;
    to_return["comments"] = comments;

    return to_return;
  },

  //
  setupController(controller, model) {
    this._super(...arguments);
    console.log("routes/tacos/view.js :: setupController: ", model);
    controller.set("model", model);
  },

  //
  actions: {

  }
});