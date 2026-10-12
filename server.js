//import express from "express";
//var express = require("express");
//var app = express();

import config from "./config/config.js";                                             //Imported config
import app from "./server/express.js";
import router from "./server/assets-router.js";                        

//const assetsRouter = require("./server/assets-router");
app.use("/src", router);
app.use("/", function (req, res) {
  res.send("Welcome to User application");
});
app.listen(config.port);                                                             //Instead of listening to port 5000, we use port.config to listen to variable in config.js file.
console.log("Server running at http://localhost:" + config.port + "/");              //String concatenation to display the port number in the console log
//module.exports = app;
export default app;
