import express from 'express';
import socket from 'socket.io';

import { DialogModel, MessageModel } from '../models';

class DialogController {
  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }

  index = (req: any, res: express.Response) => {
    const userId = req.user._id;

    DialogModel.find()
      .or([{ author: userId }, { partner: userId }])
      .populate(['author', 'partner'])
      .populate({
        path: 'lastMessage',
        populate: {
          path: 'user',
        },
      })
      .exec(function (err, dialogs) {
        if (err) {
          return res.status(404).json({
            status: 'error',
            message: 'Dialogs not found',
          });
        }
        return res.json(dialogs);
      });
  };

  create = (req: any, res: express.Response) => {
    const postData = {
      author: req.user._id,
      partner: req.body.partner,
    };

    const dialog = new DialogModel(postData);

    DialogModel.find()
      .or([
        { author: req.user._id, partner: req.body.partner },
        { partner: req.user._id, author: req.body.partner },
      ])
      .then((isHavaDialog: any) => {
        if (isHavaDialog.length) {
          const message = new MessageModel({
            text: req.body.text,
            user: req.user._id,
            dialog: isHavaDialog[0]._id,
          });
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
                  { _id: isHavaDialog[0]._id },
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

                res.json({
                  dialogId: isHavaDialog[0]._id,
                });
                this.io.emit('SERVER:NEW_MESSAGE', message);
              });
            })
            .catch((reason) => {
              res.json(reason);
            });
        } else {
          dialog
            .save()
            .then((dialogObj: any) => {
              const message = new MessageModel({
                text: req.body.text,
                user: req.user._id,
                dialog: dialogObj._id,
              });

              message
                .save()
                .then(() => {
                  dialogObj.lastMessage = message._id;
                  dialogObj.save().then(() => {
                    res.json(dialogObj);
                    this.io.emit('SERVER:DIALOG_CREATED', {
                      ...postData,
                      dialog: dialogObj,
                    });
                  });
                })
                .catch((reason) => {
                  res.json(reason);
                });
            })
            .catch((reason) => {
              res.json(reason);
            });
        }
      });
  };

  delete = (req: express.Request, res: express.Response) => {
    const id: string = req.params.id;
    DialogModel.findOneAndRemove({ _id: id })
      .then((dialog) => {
        if (dialog) {
          res.json({
            message: `dialog deleted`,
          });
        }
      })
      .catch(() => {
        res.json({
          message: 'dialog not found',
        });
      });
  };

  //   getMe() {}
}

export default DialogController;
