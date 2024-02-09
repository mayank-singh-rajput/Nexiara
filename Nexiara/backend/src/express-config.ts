import express, { Express } from "express";
import cors from "cors";
const cookieParser = require("cookie-parser");
import HandleErrors from "./utils/error_handler";
import User from "./api/user";
import Question from "./api/question";
import Result from "./api/result";

export const configureExpress = async (app: Express) => {

  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));
  app.use(cors({
    origin: "*",
    credentials: true,
  }));

  app.use(cookieParser());

  // API
  User(app);
  Question(app);
  Result(app);

  // Error Handler
  app.use(HandleErrors);
};

export default configureExpress;
