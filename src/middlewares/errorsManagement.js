//MARK: IMPORTS
import mongoose from "mongoose";
import BaseError from "../errors/BaseError.js";
import IncorrectRequestError from "../errors/IncorrectRequestError.js";
import ValidationInputError from "../errors/ValidationInputError.js";

function errorsManagement(erro, req, res, next) {
  if(erro instanceof mongoose.Error.CastError){
    new IncorrectRequestError().sendResponse(res);
  } else if (erro instanceof mongoose.Error.ValidationError){
    new ValidationInputError(erro).sendResponse(res);
  } else if(erro instanceof BaseError){
    erro.sendResponse(res);
  } else {
    new BaseError().sendResponse(res);
  }
}

export default errorsManagement;