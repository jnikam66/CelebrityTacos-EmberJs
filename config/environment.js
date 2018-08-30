'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'celebrity-taco',
    environment,
    rootURL: '/',
    locationType: 'auto',

    //  Firebase Auth
    firebase: {
      apiKey: "AIzaSyAurUVkYJCxTS07wz-5xhwK788BDRWTN1Q",
      authDomain: "celebrity-tacos-93287236.firebaseapp.com",
      databaseURL: "https://celebrity-tacos-93287236.firebaseio.com",
      projectId: "celebrity-tacos-93287236",
      storageBucket: "celebrity-tacos-93287236.appspot.com",
      messagingSenderId: "369667154298"
    },

    //  Torii; The auth provider
    torii : {
      sessionServiceName : "session",
    },

    //
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
