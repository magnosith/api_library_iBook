//MARK: IMPORTS
import express from "express";
import connectDatabase from "./config/dbConnect.js"
import book from "./models/Book.js"

const conection = await connectDatabase();

conection.on("error", (erro) => {
    console.error("Conection Error: ", erro);
})

conection.once("open", () => {
    console.log("Conection succesfully!")
})

const app = express();
app.use(express.json())

//MARK: ROUTES
app.get("/", (req, res) => {
    res.status(200).send("Node.js + Express");
});

app.get("/books", async (req, res) => {
    const listBooks = await book.find({})
    res.status(200).json(listBooks);
});

app.get("/books/:id", (req, res) => {
    const index = findBook(req.params.id);
    res.status(200).json(books[index]);
})


app.post("/books", (req, res) => {
    books.push(req.body);
    res.status(201).send("Book saved!")
})

app.put("/books/:id", (req, res) => {
    const index = findBook(req.params.id);
    books[index].title = req.body.title;
    res.status(200).json(books)
})

app.delete("/books/:id", (req, res) => {
    const index = findBook(req.params.id);
    books.splice(index, 1);
    res.status(200).send("Book removed!");
})


export default app;