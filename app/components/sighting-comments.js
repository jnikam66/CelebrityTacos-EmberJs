
/*global Ember*/

//
import Component from "@ember/component";
//import {moment} from "moment";
import {computed} from "@ember/object";

//
export default Component.extend({

  //
  store: Ember.inject.service(),
  session: Ember.inject.service("session"),

  //
  currentUserId : computed("session.currentUser", function() {

    //
    let sesh = this.get("session");
    if ( !sesh ) {
      return null;
    }
    let user = sesh.get("currentUser");
    if ( !user ) {
      return null;
    }
    return user["uid"];
  }),

  //
  actions: {

    //
    deleteComment(commentID) {

      //  Wow retro
      if ( confirm("Are you sure you want to delete this comment?\r\n\r\nThink carefully; This is SERIOUS !!!!") ) {

        //  Locate the comment
        this.get("store").findRecord("sighting-comment", commentID).then( (comment) => {

          //  Animate ... lol
          Ember.$("[data-comment-id='" + commentID + "']").hide(500,function(){
            comment.destroyRecord();
          });
        });
      }
    }
  }
});
