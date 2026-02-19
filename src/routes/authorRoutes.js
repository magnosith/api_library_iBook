//MARK: IMPORTS
import express from "express";
import AuthorController from "../controllers/authorController.js";
import pagination from "../middlewares/pagination.js";

const routes = express.Router();

routes
  .get("/authors", AuthorController.listAuthors, pagination)
  .get("/authors/:id", AuthorController.listAuthorById)
  .post("/authors", AuthorController.registerAuthor)
  .put("/authors/:id", AuthorController.updateAuthor)
  .delete("/authors/:id", AuthorController.removeAuthor);

export default routes;