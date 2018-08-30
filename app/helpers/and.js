//
import {
  helper
} from "@ember/component/helper";

//
export function and(params /*, hash*/ ) {

  //
  if (params[0] && params[1]) {
    return true;
  }
  return false;
}

//
export default helper(and);