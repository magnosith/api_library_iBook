//MARK: IMPORTS
import express from "express";
import connectDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorsManagement from "./middlewares/errorsManagement.js";
import fourZeroFourManagement from "./middlewares/fourZeroFourManagement.js";

const conection = await connectDatabase();

conection.on("error", console.log.bind(console, "Conection Fail!"));

conection.once("open", () => {
  console.log("Conection succesfully!");
});

//MARK: Initialize Routes
const app = express();
app.use(express.json());
routes(app);

app.use(fourZeroFourManagement);

//MARK: Initialize Error Management
app.use(errorsManagement);


export default app;