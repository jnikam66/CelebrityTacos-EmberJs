
//
import { helper } from "@ember/component/helper";

//
export function truncate(params/*, hash*/) {

  //
  let text = "";
  let max = 50;

  //  Grab params
  try {
    text = params[0];
    if ( params[1] ) {
      max = params[1];
    }
  }catch(e){
    //  Blahhh
  }

  //
  if ( text.length > max  ) {
    text = text.substr(0, max);
    text = text + " (truncated) ... ";
  }

  return text;
}

//
export default helper(truncate);
