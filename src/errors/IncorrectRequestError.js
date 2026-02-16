import BaseError from "./BaseError.js";

class IncorrectRequest extends BaseError {

  constructor(message = " One or more input values isn't correct!"){
    super(message, 400);
  }
}

export default IncorrectRequest;