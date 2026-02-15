//MARK: IMPORTS
import { author } from "../models/Author.js";
import book from "../models/Book.js"

class BookController {

    static async listBooks (req, res){
        try {
            const listBooks = await book.find({})
            res.status(200).json(listBooks);
        } catch (erro) {
            res.status(500).json({
                message: `${erro.message} - Failed to list books, try again!`
            });
        }
    };

     static async listBookById (req, res){
        try {
            const id = req.params.id;
            const bookFound = await book.findById(id)
            res.status(200).json(bookFound);
        } catch (erro) {
            res.status(500).json({
                message: `${erro.message} - Book not found!, try again!`
            });
        }
    };

    static async registerBook (req, res) {
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
            res.status(500).json({
                message: `${erro.message} - Failed to register new book, try again!`
            });
        }
    }

     static async updateBook (req, res){
        try {
            const id = req.params.id;
            await book.findByIdAndUpdate(id, req.body);
            res.status(200).json({
                message: "Updated Book! :)"
            });
        } catch (erro) {
            res.status(500).json({
                message: `${erro.message} - Book not updated!, try again!`
            });
        }
    };

    static async removeBook (req, res){
        try {
            const id = req.params.id;
            await book.findByIdAndDelete(id);
            res.status(200).json({
                message: "Book removed succesfully! :)"
            });
        } catch (erro) {
            res.status(500).json({
                message: `${erro.message} - Book not removed!, try again!`
            });
        }
    };

    static async listBookByPublisher (req, res) {
        const publisher = req.query.publisher
        try{
            const booksByPublisher = await book.find({publisher: publisher})
            res.status(200).json(booksByPublisher);
        } catch(erro){
            res.status(500).json({
                message: `${erro.message} - Book not found!, try again!`
            });
        }
    }

};

export default BookController;