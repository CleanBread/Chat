import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from 'dotenv'
import socket from 'socket.io';
import {createServer} from 'http';

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
const http = createServer(app)
const io = socket(http)

app.use(bodyParser.json());
app.use(updateLastSeen)
app.use(checkAuth)

mongoose.connect("mongodb://localhost:27017/chat", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.get("/user/me", User.getMe);
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

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello");
});

io.on('connection', (soket: any) => {
  console.log('io connected')
})

http.listen(process.env.PORT, function () {
  console.log(`server: http://localhost:${process.env.PORT}`);
});
// mongod --dbpath ./db