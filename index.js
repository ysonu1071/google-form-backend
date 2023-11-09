const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
require("./db/ndex")
const userRoute = require("./routes/userRoute")
const formRoute = require("./routes/formRoute");


const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRoute);
app.use("/form", formRoute);






app.listen(8000, ()=>{console.log("Server is running on port 8000")});