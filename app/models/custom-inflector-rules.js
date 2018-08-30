

//  Reference: https://guides.emberjs.com/v2.14.0/models/customizing-adapters/#toc_pluralization-customization
import Inflector from "ember-inflector";

const inflector = Inflector.inflector;

inflector.irregular("taco-type", "taco-types");
//inflector.uncountable('advice');

// Meet Ember Inspector's expectation of an export
export default {};
