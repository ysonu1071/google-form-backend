const express = require("express");
const { signUp, signIn } = require("../controllers/userController");

const route = express.Router();

route.post("/signup", signUp);
route.post("/signin", signIn);


module.exports = route;