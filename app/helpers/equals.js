

//
import { helper } from "@ember/component/helper";


//
export function equals(params/*, hash*/) {

  //
  if ( params[0] && params[1] ) {
    if ( params[0] === params[1] ) {
      return true;
    }
  }

  return false;
}

//
export default helper(equals);
