import Route from "@ember/routing/route";

export default Route.extend({

  //  ember install ember-cli-document-title
  title: "About Celebrity Taco",

  //
  model() {
    return "";
  },

  //
  setupController(controller, model) {
    this._super(...arguments);
    console.log("routes/about.js :: setupController: ", model);
    controller.set("model", model);
  }
});
