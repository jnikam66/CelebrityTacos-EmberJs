//
/*global Ember*/

//
import Controller from "@ember/controller";
import {
  computed,
  observer
} from "@ember/object";


//
export default Controller.extend({

  //
  isFormValid: computed.and(
    "isTacoTitleValid",
    "isTacoDescriptionValid",
    "isTacoLocationValid",
    "isTacoLocationGeoCoordinatesValid",
    "isTacoCelebrityValid",
    "isTacoTypeValid",
    "isTacoImageFileDataUrlValid"
  ),
  responseMessage: "",

  //
  tacoTitle: "",
  isTacoTitleValid: computed.and("isTacoTitleLongEnough"),
  isTacoTitleLongEnough: computed.gte("tacoTitle.length", 5),
  tacoTitleChanged: observer("tacoTitle", function() {
    //console.log("Taco Title has changed!");
  }),

  //
  tacoDescription: "",
  isTacoDescriptionValid: computed.and("isTacoDescriptionLongEnough"),
  isTacoDescriptionLongEnough: computed.gte("tacoDescription.length", 10),
  tacoDescriptionChanged: observer("tacoDescription", function() {
    //console.log("Taco Description has changed");
  }),

  //
  tacoLocation: "",
  isTacoLocationValid: computed.and("isTacoLocationLongEnough"),
  isTacoLocationInValid: computed.not("isTacoLocationValid"),
  isTacoLocationLongEnough: computed.gte("tacoLocation.length", 5),
  tacoLocationChanged: observer("tacoLocation", function() {
    //console.log("Taco Location has changed!");
    this.set("tacoLocationGeoCoordinates", "");
  }),

  //
  tacoLocationGeoCoordinates: "",
  isTacoLocationGeoCoordinatesValid: computed("tacoLocationGeoCoordinates_parsed", function() {

    //
    let coords = this.get("tacoLocationGeoCoordinates_parsed");

    //
    if (!isNaN(coords["latitude"]) && !isNaN(coords["longitude"])) {

      //  Sane range for lat/long
      if (
        coords["latitude"] >= -90 &&
        coords["latitude"] <= 90 &&
        coords["longitude"] >= -180 &&
        coords["longitude"] <= 180
      ) {
        return true;
      }
    }

    return false;

  }),
  tacoLocationGeoCoordinates_parsed: computed("tacoLocationGeoCoordinates", function() {

    //
    let coords = this.get("tacoLocationGeoCoordinates");
    let parts = coords.split(",");

    //
    let lat = NaN;
    let long = NaN;
    try {
      lat = parseFloat(parts[0]);
      long = parseFloat(parts[1]);
    } catch (e) {
      //
    }

    //
    return {
      "latitude": lat,
      "longitude": long
    };
  }),
  tacoLocationGeoCoordinatesChanged: observer("tacoLocationGeoCoordinates", function() {

    //
    this.set("tacoLocationGeoCoordinatesMessage", "");
  }),
  isTacoLocationGeoCoordinatesAutoInProgress: false,
  isTacoLocationGeoCoordinatesAutoButtonDisabled: computed(
    "isTacoLocationGeoCoordinatesAutoInProgress",
    "isTacoLocationValid",
    function() {

      //
      if (this.get("isTacoLocationGeoCoordinatesAutoInProgress")) {
        return true;
      }
      if (!this.get("isTacoLocationValid")) {
        return true;
      }

      return false;
    }
  ),
  tacoLocationGeoCoordinatesMessage: "",
  tacoLocationGeoCoordinatesMessageClass: "",

  //
  tacoCelebrity: "",
  isTacoCelebrityValid: computed.not("isTacoCelebrityBlank"),
  isTacoCelebrityBlank: computed.empty("tacoCelebrity"),
  tacoCelebrityChanged: observer("tacoCelebrity", function() {

    //
    console.log("Taco Celebrity Changed:", this.get("tacoCelebrity"));

    //
    if (this.get("isTacoCelebrityValid")) {
      console.log("Celebrity seems to be valid");
    } else {
      console.log("Celebrity seems to be invalid");
    }
  }),

  //
  tacoType: "",
  isTacoTypeValid: computed.not("isTacoTypeBlank"),
  isTacoTypeBlank: computed.empty("tacoType"),

  //
  tacoImageFile: "",
  tacoImageFileDataUrl: "",
  tacoImageFileDataUrlChanged: observer("tacoImageFileDataUrl", function() {

    //
    //console.log("tacoImageFileDataUrl data changed", this.get("tacoImageFileDataUrl"));
  }),
  isTacoImageFileDataUrlBlank: computed.empty("tacoImageFileDataUrl"),
  isTacoImageFileDataUrlValid: computed.not("isTacoImageFileDataUrlBlank"),

  //
  isSubmitButtonDisabled: computed.not("isFormValid"),

  //
  actions: {

    //
    tacoCelebrityChanged(v) {
      //console.log("Celebrity changed ...", v);
      this.set("tacoCelebrity", v);
    },
    tacoTypeChanged(v) {
      //console.log("Taco type changed ...", v);
      this.set("tacoType", v);
    },

    //
    autoLocationGeo() {

      //
      let location = this.get("tacoLocation");
      console.log("Getting auto geo location!", location);

      //  Hack YAY
      this.set("isTacoLocationGeoCoordinatesAutoInProgress", true);
      let url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(location);
      Ember.$.ajax({

        //
        url: url,
        method: "GET",

        //
        success: (data /* , textStatus, jqXHR */ ) => {

          //
          let status = "";
          if (data && data["status"]) {
            status = data["status"];
          } else {
            this.set("tacoLocationGeoCoordinatesMessage", "Invalid response from API (???): " + JSON.stringify(data));
            this.set("tacoLocationGeoCoordinatesMessageClass", "alert-danger");
            return;
          }

          //
          if (status == "OK") {
            //console.log("Geo-Coding data:", data);
          } else if (status == "OVER_QUERY_LIMIT") {
            this.set("tacoLocationGeoCoordinatesMessage", "This application has exceeded its geo-encoding query limit for the day. Sorry!");
            this.set("tacoLocationGeoCoordinatesMessageClass", "alert-danger");
          } else {
            this.set("tacoLocationGeoCoordinatesMessage", "Unknown error");
            this.set("tacoLocationGeoCoordinatesMessageClass", "alert-danger");
          }

          //
          if (!data["results"] || !data["results"][0]) {
            this.set("tacoLocationGeoCoordinatesMessage", "API returned an empty result set. Whoops.");
            this.set("tacoLocationGeoCoordinatesMessageClass", "alert-danger");
            console.log("Google GeoCode returned empty result set: ", data);
            return;
          }
          let result = data["results"][0];

          //
          let latitude = result["geometry"]["location"]["lat"];
          let longitude = result["geometry"]["location"]["lng"];

          //  Set the form field value before the message div,
          //  or the value's observer will erase the div
          this.set("tacoLocationGeoCoordinates", latitude + ", " + longitude);

          //  Set the success-message
          this.set("tacoLocationGeoCoordinatesMessage", "Geo-encoding was successful!");
          this.set("tacoLocationGeoCoordinatesMessageClass", "alert-success");
        },

        //
        error: (jqXHR, textStatus, errorThrown) => {
          this.set("tacoLocationGeoCoordinatesMessage", "An error was encountered while trying to contact the server: " + textStatus + ";" + errorThrown);
          this.set("tacoLocationGeoCoordinatesMessageClass", "alert-danger");
        },

        //
        complete: ( /*  jqXHR, textStatus */ ) => {
          console.log("Google Geo Query: Complete");
          this.set("isTacoLocationGeoCoordinatesAutoInProgress", false);
        }

      });
    },

    //
    didSelectImage(files) {

      //
      console.log("didSelectImage was fired", files);

      //  Special thanks to: https://medium.com/@lawrey/emberjs-firebase-journey-4-how-to-upload-image-to-firebase-ee49cc1d2b7b
      let reader = new FileReader();
      reader.onloadend = Ember.run.bind(this, function() {
        let dataUrl = reader.result;
        let imgPreview = document.getElementById("taco-image-file-preview");
        imgPreview.src = dataUrl;
        this.set("tacoImageFile", files[0]);
        this.set("tacoImageFileDataUrl", dataUrl);
      });
      reader.readAsDataURL(files[0]);
    },

    //
    submitNewSighting() {

      //  Construct basics
      let tacoLocationGeoCoordinates_parsed = this.get("tacoLocationGeoCoordinates_parsed");
      let data = {
        "date": new Date(),
        "title": this.get("tacoTitle"),
        "description": this.get("tacoDescription"),
        "location": this.get("tacoLocation"),
        "location_latitude": tacoLocationGeoCoordinates_parsed["latitude"],
        "location_longitude": tacoLocationGeoCoordinates_parsed["longitude"],
        "imageDataUrl": this.get("tacoImageFileDataUrl")
      };
      console.log("Basic form data:", data);

      //  Load up the celebrity and the taco types
      let load_celebrity = this.store.findRecord("celebrity", this.get("tacoCelebrity"));
      let load_tacoType = this.store.findRecord("taco-type", this.get("tacoType"));

      //  Wait for both loads to resolve before creating the sighting
      let promise_savedSighting = Ember.RSVP.all([load_celebrity, load_tacoType]).then((values) => {

        //
        let celebrity = values[0];
        let tacoType = values[1];

        //
        console.log("Resolved both loads");
        console.log("Celebrity:", celebrity);
        console.log("Taco Type:", tacoType);

        //  Create new sighting using the basic data
        let newSighting = this.store.createRecord("sighting", data);

        //  Set celebrity and taco
        newSighting.set("celebrities", [celebrity]);
        newSighting.set("tacoTypes", [tacoType]);

        //  Save
        let promise_saved = newSighting.save();

        return promise_saved;
      });

      //  After we successfully saved, let's respond and clear the form
      promise_savedSighting.then((response) => {

        //
        console.log("Saved taco sighting", response);
        this.set("responseMessage", "Thank you! Your taco sighting has been submitted!");

        //  Save a special global: lastSightingID
        let sighting_id = response.get("id");
        let record_global = this.store.findRecord("global", "lastSightingID");
        record_global.then((record) => {
          record.set("value", sighting_id);
          record.save();
        }).catch(( /*e */ ) => {
          let record_new = this.store.createRecord("global", {
            "id": "lastSightingID",
            "value": sighting_id
          });
          record_new.save();
        });

        //
        this.set("tacoTitle", "");
        this.set("tacoDescription", "");
        this.set("tacoLocation", "");
        this.set("tacoLocationGeoCoordinates", "");
        this.set("tacoCelebrity", "");
        this.set("tacoType", "");
        this.set("tacoImageFileDataUrl", "");

        //  Yay reset the form
        Ember.$("#taco-image-file-preview").attr("src", "");
        Ember.$("form[data-form-role=create-new-sighting]").first()[0].reset();
        //console.log("Form reset is disabled in controller new.js");

        //  Focus back up top
        //let $scroll_container = Ember.$("html, body");
        //let $scroll_target = Ember.$("[data-element-role=sighting-submit-success-container]").first();
        let $scroll_target = Ember.$("[data-element-role=main-page-jumbotron]").first();
        Ember.$("html, body").animate({
          scrollTop: $scroll_target.offset().top - Ember.$("nav.navbar").height() //  Frikkin navbar, bro
        }, 250);
      });
    }
  }
});