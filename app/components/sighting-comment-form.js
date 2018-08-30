/*global Ember*/

//
import Component from "@ember/component";
import {computed, observer} from "@ember/object";

//
export default Component.extend({

  //
  store: Ember.inject.service(),
  session: Ember.inject.service("session"),

  //
  responseMessage : "",
  isCommentFormValid : computed.and("isCommentAuthorValid", "isCommentBodyValid"),

  //
  commentAuthorUserID: computed("session", function(){

    //
    let sesh = this.get("session");
    let user = sesh.get("currentUser");
    let uid = user["uid"];

    return uid;
  }),
  commentAuthorPhotoUrl: computed("session", function(){

    //
    let sesh = this.get("session");
    let user = sesh.get("currentUser");
    let photo_url = user["photoURL"];

    return photo_url;

  }),
  commentAuthor: computed("session", function() {

    //
    let sesh = this.get("session");
    let user = sesh.get("currentUser");
    let displayName = user["displayName"];
    console.log("user", user);

    return displayName;
  }),
  commentAuthorChanged : observer("commentAuthor", function() {

    //
    this.set("responseMessage", "");
  }),
  isCommentAuthorLongEnough : computed.gte("commentAuthor.length", 2),
  isCommentAuthorValid : computed.and("isCommentAuthorLongEnough"),

  //
  commentBody: "",
  commentBodyChanged : observer("commentBody", function() {
    this.set("responseMessage", "");
  }),
  isCommentBodyLongEnough : computed.gte("commentBody.length", 2),
  isCommentBodyValid : computed.and("isCommentBodyLongEnough"),

  //
  isCommentSubmitButtonDisabled : computed.not("isCommentFormValid"),

  //
  actions : {

    //
    submitNewComment(sighting_id) {

      //
      console.log("Submitting comment for sighting#" + sighting_id);

      //  Gather data
      let data = {
        "sighting_id" : sighting_id,
        "date" : new Date(),
        "author_uid" : this.get("commentAuthorUserID"),
        "author_photo_url" : this.get("commentAuthorPhotoUrl"),
        "author" : this.get("commentAuthor"),
        "body" : this.get("commentBody")
      };

      //  Create a new record
      let store = this.get("store");
      let newComment = store.createRecord("sighting-comment", data);

      //  Save
      newComment.save().then( () => {

        //  Clear form
        this.set("commentBody", "");
        this.set("responseMessage", "Thank you for submitting your comment!");

        //
        console.log("Saved new comment: ", data);
      });


    }
  }

});
