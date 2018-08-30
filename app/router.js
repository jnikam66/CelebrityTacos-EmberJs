
//
import EmberRouter from "@ember/routing/router";
import config from "./config/environment";

//
const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

//
Router.map(function() {
  this.route("about");
  this.route("tacos", function() {
    this.route("latest");
    this.route("new");
    this.route("view", { path: "/:sighting_id/view" });
    this.route("map");
  });
});

//
export default Router;
