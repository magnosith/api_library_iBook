
//MARK: IMPORTS
import { author } from "../models/Author.js"


class AuthorController {

    static async listAuthors (req, res){
        try {
            const listAuthors = await author.find({})
            res.status(200).json(listAuthors);
        } catch (erro) {
            res.status(500).json({
                message: `${erro.message} - Failed to list Authors, try again!`
            });
        }
    };

     static async listAuthorById (req, res){
        try {
            const id = req.params.id;
            const authorFound = await author.findById(id)
            res.status(200).json(authorFound);
        } catch (erro) {
            res.status(500).json({
                message: `${erro.message} - Author not found!, try again!`
            });
        }
    };

    static async registerAuthor (req, res) {
        try{
            const newAuthor = await author.create(req.body);
            res.status(201).json({
                message: "Register succesfully!",
                author: newAuthor
            });
        } catch (erro) {
            res.status(500).json({
                message: `${erro.message} - Failed to register new Author, try again!`
            });
        }
    }

     static async updateAuthor (req, res){
        try {
            const id = req.params.id;
            await author.findByIdAndUpdate(id, req.body);
            res.status(200).json({
                message: "Author Updated! :)"
            });
        } catch (erro) {
            res.status(500).json({
                message: `${erro.message} - Author not updated!, try again!`
            });
        }
    };

    static async removeAuthor (req, res){
        try {
            const id = req.params.id;
            await author.findByIdAndDelete(id);
            res.status(200).json({
                message: "Author removed succesfully! :)"
            });
        } catch (erro) {
            res.status(500).json({
                message: `${erro.message} - Author not removed!, try again!`
            });
        }
    };
};

export default AuthorController;