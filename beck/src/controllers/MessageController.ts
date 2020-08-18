import express from 'express';
import socket from 'socket.io';

import { MessageModel, DialogModel } from '../models';

class MessageController {
  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }

  index = (req: any, res: express.Response) => {
    const dialogId = req.query.dialog;

    MessageModel.find({ dialog: dialogId })
      .populate(['dialog', 'user'])
      .exec((err, message) => {
        if (err) {
          return res.status(404).json({
            message: 'Messages not found',
          });
        }
        return res.json(message);
      });
  };

  create = (req: any, res: express.Response) => {
    const postData = {
      text: req.body.text,
      dialog: req.body.dialog_id,
      user: req.user._id,
    };
    const message = new MessageModel(postData);
    message
      .save()
      .then((obj: any) => {
        obj.populate(['dialog', 'user'], (err: any, message: any) => {
          if (err) {
            return res.status(500).json({
              status: 'error',
              message: err,
            });
          }

          DialogModel.findOneAndUpdate(
            { _id: postData.dialog },
            { lastMessage: message._id },
            { upsert: true },
            (err) => {
              if (err) {
                return res.status(500).json({
                  status: 'error',
                  message: err,
                });
              }
            },
          );

          res.json(message);
          this.io.emit('SERVER:NEW_MESSAGE', message);
        });
      })
      .catch((reason) => {
        res.json(reason);
      });
  };

  delete = (req: any, res: express.Response) => {
    const id: string = req.params.id;
    const userId: string = req.user._id;

    MessageModel.findById(id, (err, message: any) => {
      if (err || !message) {
        return res.status(404).json({
          status: 'error',
          message: 'Message not found',
        });
      }

      if (message.user._id.toString() === userId.toString()) {
        message.remove();
        return res.json({
          status: 'success',
          message: 'message removed',
        });
      } else {
        return res.status(403).json({
          status: 'error',
          message: 'not your message',
        });
      }
    });
  };

  //   getMe() {}
}

export default MessageController;
