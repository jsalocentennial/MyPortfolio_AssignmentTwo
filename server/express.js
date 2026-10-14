import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";

import projectRouter from "./routes/project-routes.js";  //Test import for project routes
import userRouter from "./routes/user-routes.js";  //Test import for user routes
import qualificationRouter from "./routes/qualification-router.js";  //Test import for qualification routes
import contactRouter from "./routes/contact-router.js";  //Test import for contact routes
import authMiddleware from './middlewares/auth.js';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());
app.use("/api/users", userRouter);  //Test route for user routes
app.use("/api/projects", authMiddleware, projectRouter);  //Test route for project routes
app.use("/api/qualifications", authMiddleware, qualificationRouter);  //Test route for qualification routes
app.use("/api/contacts", authMiddleware, contactRouter);  //Test route for contact routes

export default app;
