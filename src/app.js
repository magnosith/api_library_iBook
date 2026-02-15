//MARK: IMPORTS
import express from "express";
import connectDatabase from "./config/dbConnect.js"
import routes from "./routes/index.js";

const conection = await connectDatabase();

conection.on("error", (erro) => {
    console.error("Conection Error: ", erro);
})

conection.once("open", () => {
    console.log("Conection succesfully!")
})

const app = express();
routes(app);

app.delete("/books/:id", (req, res) => {
    const index = findBook(req.params.id);
    books.splice(index, 1);
    res.status(200).send("Book removed!");
})


export default app;