//MARK: IMPORTS
import NotFound from "../errors/NotFound.js";
import author from "../models/Author.js";
import book from "../models/Book.js";

class BookController {

  static async listBooks (req, res, next){
    try {
      const listBooks = await book.find({});
      res.status(200).json(listBooks);
    } catch (erro) {
      next(erro);
    }
  };

  static async listBookById (req, res, next){
    try {
      const id = req.params.id;
      const bookFound = await book.findById(id);
      if(bookFound !== null){
        res.status(200).json(bookFound);
      } else {
        next(new NotFound("Book ID not found"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static async registerBook (req, res, next) {
    const newBook = await req.body;
    try{
      const authorFound = await author.findById(newBook.author);
      const completeBook = { ...newBook, author: { ...authorFound._doc}};
      const createdBook = await book.create(completeBook);
      res.status(201).json({
        message: "Register succesfully!",
        book: createdBook
      });
    } catch (erro) {
      next(erro);
    }
  }

  static async updateBook (req, res, next){
    try {
      const id = req.params.id;
      const booksResult = await book.findByIdAndUpdate(id, req.body);
      
      if (booksResult !== null){
        res.status(200).json({
          message: "Updated Book! :)"
        });
      } else {
        next(new NotFound("Book's ID not found!"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static async removeBook (req, res, next){
    try {
      const id = req.params.id;
      const booksResult = await book.findByIdAndDelete(id);
      
      if (booksResult !== null) {
        res.status(200).json({
          message: "Book removed succesfully! :)"
        });
      } else {
        next(new NotFound("Book's ID not found!"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static async listBookByPublisher (req, res, next) {
    const publisher = req.query.publisher;
    try{
      const booksByPublisher = await book.find({publisher: publisher});
      res.status(200).json(booksByPublisher);
    } catch(erro){
      next(erro);
    }
  }
};

export default BookController;