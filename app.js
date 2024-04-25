const express = require("express");
const app = express();
const db = require("./db");
const cors = require("cors");
const authController = require("./controller/authController");
const bookController = require("./controller/bookController");
const { verifyToken } = require("./middleware/jwtAuth");
const { swaggerDocs } = require("./swagger");

app.use(cors());
app.use(express.json());

db();

app.use("/api/auth", authController);
app.use("/api/books", verifyToken, bookController);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server has started");
  swaggerDocs(app, process.env.PORT || 3000);
});
