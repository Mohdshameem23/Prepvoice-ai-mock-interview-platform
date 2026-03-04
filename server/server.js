const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
const connectDB=require('./config/db')
connectDB();
const questionsRouter = require("./routes/questions");
app.use("/api", questionsRouter);
app.listen(5000, () => {
  console.log("Server is running on port 5000");
  console.log("hii");
});
app.get("/", (req, res) => {
  res.send("Hello World df");
});
