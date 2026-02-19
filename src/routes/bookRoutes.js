//MARK: IMPORTS
import express from "express";
import BookController from "../controllers/bookController.js";
import pagination from "../middlewares/pagination.js";

const routes = express.Router();

routes
  .get("/books", BookController.listBooks, pagination)
  .get("/books/search", BookController.listBookByFilter, pagination)
  .get("/books/:id", BookController.listBookById)
  .post("/books", BookController.registerBook)
  .put("/books/:id", BookController.updateBook)
  .delete("/books/:id", BookController.removeBook);

export default routes;