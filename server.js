//MARK: IMPORTS
//import http from "http";
import "dotenv/config";
import app from "./src/app.js";

const PORT = 3000;

//Using HTTP from Node Native
// const routes = {
//     "/": "Node.js + Express API Training",
//     "/books": "Books Library",
//     "/authors": "Authors Collection"
// }

//Using HTTP from Node Native
// const server = http.createServer((req, res) => {
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.end(routes[req.url]);
// });

app.listen(PORT, () => {
    console.log("Server Listening ....")
});