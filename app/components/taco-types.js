

//
import Component from "@ember/component";
import {computed} from "@ember/object";

//
export default Component.extend({

  //
  tagName: "span",

  //
  lastTacoTypeId : computed("tacoTypes", function(){

    //
    let tacoTypes = this.get("tacoTypes");
    let id = null;

    //
    tacoTypes.forEach(function(t){
      id = t.get("id");
    });

    return id;
  })
});
