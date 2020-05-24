import express from "express";

import { MessageModel } from "../models";

class MessageController {
  index(req: any, res: express.Response) {
    const dialogId = req.query.dialog;

    MessageModel.find({ dialog: dialogId })
      .populate(["dialog"])
      .exec((err, message) => {
        if (err) {
          return res.status(404).json({
            message: "Messages not found",
          });
        }
        return res.json(message);
      });
  }

  create(req: express.Request, res: express.Response) {
    const UserId = '5eca53c7354ccc3e44f72fcb'

    const postData = {
      text: req.body.text,
      dialog: req.body.dialog_id,
      user: UserId,
    };
    const message = new MessageModel(postData);
    message
      .save()
      .then((obj: any) => {
        res.json(obj);
      })
      .catch((reason) => {
        res.json(reason);
      });
  }

  delete(req: express.Request, res: express.Response) {
    const id: string = req.params.id;
    MessageModel.findOneAndRemove({ _id: id })
      .then((message) => {
        if (message) {
          res.json({
            message: `message deleted`,
          });
        }
      })
      .catch(() => {
        res.json({
          message: "message not found",
        });
      });
  }

  //   getMe() {}
}

export default MessageController;
