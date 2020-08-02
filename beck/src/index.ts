import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from 'dotenv'

import {
  UserController,
  DialogController,
  MessageController,
} from "./controllers";

import { updateLastSeen, checkAuth } from './middlewares'
import { loginValidation } from './utils/validations';

dotenv.config()

const User = new UserController();
const Dialog = new DialogController();
const Messages = new MessageController();

const app = express();

app.use(bodyParser.json());
app.use(updateLastSeen)
app.use(checkAuth)

mongoose.connect("mongodb://localhost:27017/chat", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.get("/user/:id", User.show);
app.delete("/user/:id", User.delete);
app.post("/user/registration", User.create);
app.post("/user/login", loginValidation, User.login);

app.get("/dialogs", Dialog.index);
app.delete("/dialogs/:id", Dialog.delete);
app.post("/dialogs", Dialog.create);

app.get("/messages", Messages.index);
app.delete("/messages/:id", Messages.delete);
app.post("/messages", Messages.create);

app.get("/", (req: any, res: any) => {
  res.send("Hello");
});

app.listen(process.env.PORT, function () {
  console.log(`server: http://localhost:${process.env.PORT}`);
});
