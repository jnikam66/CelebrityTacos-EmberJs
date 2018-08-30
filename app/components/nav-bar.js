import Ember from "ember";
import Component from "@ember/component";
//import {computed, observer} from "@ember/object";
import {computed} from "@ember/object";

//
export default Component.extend({

  //
  session: Ember.inject.service("session"),

  //  Trick to give components access to current route:
  //  https://stackoverflow.com/questions/18302463/get-current-route-name-in-ember
  routing: Ember.inject.service("-routing"),
  checkMyRouteName: computed("routing.currentRouteName", function() {
    return this.get("routing.currentRouteName");
  }),


  //
  isHomeActive: computed.equal("checkMyRouteName", "index"),
  isLatestTacosActive: computed.equal("checkMyRouteName", "tacos.latest"),
  isMapActive: computed.equal("checkMyRouteName", "tacos.map"),
  isNewTacoActive: computed.equal("checkMyRouteName", "tacos.new"),
  isAboutActive: computed.equal("checkMyRouteName", "about"),

  //
  actions : {

    //
    signIn(provider){

      //
      this.get("session").open("firebase", { provider: provider}).then(function(data) {
        //console.log("Current User", data.currentUser);
        console.log("Signed in from nav-bar", data.currentUser);
      });
    },

    //
    signOut() {
      console.log("Signing out from nav-bar");
      this.get("session").close();
    }
  }
});
