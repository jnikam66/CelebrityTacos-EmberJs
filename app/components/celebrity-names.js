

//
import Component from "@ember/component";
import {computed} from "@ember/object";

//
export default Component.extend({

  //
  tagName: "span",

  //
  lastCelebrityId : computed("celebrities", function(){

    //
    let celebs = this.get("celebrities");
    let id = null;

    //
    celebs.forEach(function(celeb){
      id = celeb.get("id");
    });

    return id;
  })
});
