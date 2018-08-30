//
import Route from "@ember/routing/route";
import ResetScrollPositionMixin from "../../mixins/page-load-scroll-to-top";

//  One possible solution to the promise nightmare
//  https://stackoverflow.com/questions/23206883/how-to-return-a-promise-composed-of-nested-models-in-emberjs-with-emberdata

//
export default Route.extend(ResetScrollPositionMixin, {

  //
  title: "Latest Celebrity Tacos",

  //
  model() {
    return this.store.findAll("sighting", {
      reload: true
    }).then((sightings) => {
      //return sightings.sortBy("date");  //  Apparently this didn't work, so using the controller
      return sightings;
    });
  },

  //
  setupController(controller, model) {
    this._super(...arguments);
    console.log("routes/tacos/view.js :: setupController: ", model);
    controller.set("model", model);
  }
});