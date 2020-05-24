import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import {
  UserController,
  DialogController,
  MessageController,
} from "./controllers";

const User = new UserController();
const Dialog = new DialogController();
const Messages = new MessageController();

const app = express();

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/chat", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.get("/user/:id", User.show);
app.delete("/user/:id", User.delete);
app.post("/user/registration", User.create);

app.get("/dialogs", Dialog.index);
app.delete("/dialogs/:id", Dialog.delete);
app.post("/dialogs", Dialog.create);

app.get("/messages", Messages.index);
app.delete("/messages/:id", Messages.delete);
app.post("/messages", Messages.create);

app.get("/", (req: any, res: any) => {
  res.send("Hello");
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
