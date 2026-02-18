//MARK: IMPORTS
import NotFound from "../errors/NotFound.js";
import {author} from "../models/index.js";

class AuthorController {

  static async listAuthors (req, res, next){
    try {
      const listAuthors = await author.find({});
      res.status(200).json(listAuthors);
    } catch (erro) {
      next(erro);
    }
  };

  static async listAuthorById (req, res, next){
    try {
      const id = req.params.id;
      const authorFound = await author.findById(id);
      if(authorFound !== null) {
        res.status(200).json(authorFound);
      } else {
        next(new NotFound("Author's ID not found!"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static async registerAuthor (req, res, next) {
    try{
      const newAuthor = await author.create(req.body);
      res.status(201).json({
        message: "Register succesfully!",
        author: newAuthor
      });
    } catch (erro) {
      next(erro);
    }
  }

  static async updateAuthor (req, res, next){
    try {
      const id = req.params.id;
      const authorResult = await author.findByIdAndUpdate(id, req.body);

      if (authorResult !== null) {
        res.status(200).json({
          message: "Author Updated! :)"
        });
      } else {
        next(new NotFound("Author's ID not found!"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static async removeAuthor (req, res, next){
    try {
      const id = req.params.id;
      const authorResult = await author.findByIdAndDelete(id);
      
      if (authorResult !== null) {
        res.status(200).json({
          message: "Author removed succesfully! :)"
        });
      } else {
        next(new NotFound("Author's ID not found!"));
      }
    } catch (erro) {
      next(erro);
    }
  };
};

export default AuthorController;