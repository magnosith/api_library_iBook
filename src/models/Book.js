//MARK: IMPORTS
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId},
  title: {
    type: String, 
    required: [true, "Book's name is required!"]
  },
  publisher: {
    type: String, 
    required: [true, "Publiher's name is required"]
  },
  price: {
    type: Number, 
    required: [true, "Price is required"]
  },
  pages: {type: Number},
  author: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "authors", 
    required: [true, "Author's name is required"]
  }
}, { versionKey: false});

const book = mongoose.model("books", bookSchema);

export default book;