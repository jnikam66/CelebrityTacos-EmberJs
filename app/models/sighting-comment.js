
//
import DS from "ember-data";

//
export default DS.Model.extend({

  //
  sighting_id : DS.attr("string"),

  //
  date: DS.attr("date"),
  author: DS.attr("string"),
  author_uid: DS.attr("string"),
  author_photo_url: DS.attr("string"),
  body : DS.attr("string")
});
