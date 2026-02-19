//MARK: IMPORTS
import NotFound from "../errors/NotFound.js";
import { author, book } from "../models/index.js";

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

  static listBookByFilter = async (req, res, next) => {
    try{
      const find = await findProcess(req.query);

      if (find !== null){
        const searchedBook = await book
          .find(find)
          .populate("author");    
        res.status(200).json(searchedBook);
      } else {
        res.status(200).send([]);
      }
    } catch(erro){
      next(erro);
      console.log(erro);
    }
  };
}

async function findProcess(params) {
  const { publisher, title, minPages, maxPages, authorName } = params;
  let find = {};
      
  if (publisher) find.publisher = publisher;
  if (title) find.title = { $regex: title, $options: "i"};
  
  if (minPages || maxPages) find.pages = {};
  if (minPages) find.pages.$gte = minPages;
  if (maxPages) find.pages.$lte = maxPages;

  if (authorName) {
    const authorTitle = await author.findOne({ name: authorName });

    if (authorTitle !== null) {
      find.author = authorTitle._id;
    } else {
      find = null;
    }
  }

  return find;
}

export default BookController;