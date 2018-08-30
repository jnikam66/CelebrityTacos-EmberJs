
//  Leaflet exposes itself as "L" ... lol
/*global L*/

//
import Controller from "@ember/controller";
import {computed} from "@ember/object";

//
export default Controller.extend({

  //
  taco : computed("", function(){

    //
    //console.log("Taco-Icons.js controller being called!");

    //
    return L.icon({
      iconUrl: "/assets/images/taco-map-pointer.png",
      iconSize: [100, 65],
      iconAnchor: [46, 65],
      popupAnchor: [0, -50],
      shadowUrl: "",
      shadowSize: [0,0],
      shadowAnchor: [0,0]
    });
  }),
});
