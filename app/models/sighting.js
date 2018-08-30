
/*COUGH global Ember*/

//
import DS from "ember-data";

//
export default DS.Model.extend({

  //
  "date" : DS.attr("date"),
  "title" : DS.attr("string"),
  "description" : DS.attr("string"),
  "location" : DS.attr("string"),
  "location_latitude" : DS.attr("number"),
  "location_longitude" : DS.attr("number"),
  "imageDataUrl" : DS.attr("string"),

  //
  "celebrities" : DS.hasMany("celebrity"),
  "tacoTypes" : DS.hasMany("tacoType")
  //"photo" : DS.attr("file"),
  //"imageUrl": Ember.computed.alias("photo.url")
});
