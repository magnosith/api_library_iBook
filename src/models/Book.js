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
    required: [true, "Publiher's name is required"],
    enum: {
      values: ["CodeHouse", "Horsedark"],
      message: "The publisher {VALUE} is not a permited value" 
    }
  },
  price: {
    type: Number, 
    required: [true, "Price is required"]
  },
  pages: {
    type: Number,
    validate: {
      validator: (value) => {
        return value >= 10 && value <= 5000;
      },
      message: "The page number must be between 10 and 5000. Value provided: {VALUE} not allowed."
    }
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "authors", 
    required: [true, "Author's name is required"]
  }
}, { versionKey: false});

const book = mongoose.model("books", bookSchema);

export default book;