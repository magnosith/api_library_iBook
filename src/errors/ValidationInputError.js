//MARK: IMPORTS
import IncorrectRequestError from "./IncorrectRequestError.js";

class ValidationInputError extends IncorrectRequestError {
  constructor(erro) {
    const erroMessages = Object.values(erro.errors)
      .map(erro => erro.message)
      .join("; ");
    super(`Following errors found: ${erroMessages}`);
  }
}

export default ValidationInputError;