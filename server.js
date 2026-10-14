// //import express from "express";
// //var express = require("express");
// //var app = express();

// import config from "./config/config.js";                                             //Imported config
// import app from "./server/express.js";
// import router from "./server/assets-router.js";                        

// //const assetsRouter = require("./server/assets-router");
// app.use("/src", router);
// app.use("/", function (req, res) {
//   res.send("Welcome to User application");
// });
// app.listen(config.port);                                                             //Instead of listening to port 5000, we use port.config to listen to variable in config.js file.
// console.log("Server running at http://localhost:" + config.port + "/");              //String concatenation to display the port number in the console log
// //module.exports = app;
// export default app;

import config from './config/config.js'
import app from './server/express.js'
import mongoose from 'mongoose'
import authMiddleware from './server/middlewares/auth.js'

mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, {
  //useNewUrlParser: true,
  //useCreateIndex: true,
  //useUnifiedTopology: true
} )
  .then(() => {
    console.log("Connected to the database!");
    })
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`)
  })

  app.get("/", (req, res) => {
    res.json({ message: "Welcome to Jordans Portolio Datebase." });
    });

app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
  }

console.info('Server started on port %s.', config.port)
})