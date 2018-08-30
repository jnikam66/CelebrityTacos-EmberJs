
//
import Route from "@ember/routing/route";
import {inject} from "@ember/service";

export default Route.extend({

  //
  session : inject(),

  //
  beforeModel: function() {
    return this.get("session").fetch().then(function() {
      console.log("session fetched");
    }, function() {
      console.log("no session to fetch");
    });
  },

  //
  actions: {

    //
    signIn(provider){

      //
      this.get("session").open("firebase", { provider: provider}).then(function(data) {
        console.log("Current User", data.currentUser);
      });
    },

    //
    signOut() {
      console.log("Signing out");
      this.get("session").close();
    }
  }

});
