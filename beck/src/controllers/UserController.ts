import express from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import socket from 'socket.io';

import { UserModel } from '../models';
import { IUser } from '../models/User';
import { createJWTToken, generatePasswordHash } from '../utils';

class UserController {
  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }

  show = (req: express.Request, res: express.Response) => {
    const id: string = req.params.id;
    UserModel.findById(id, (err, user) => {
      if (err) {
        return res.status(404).json({
          message: 'not found',
        });
      } else {
        res.json(user);
      }
    });
  };

  delete = (req: express.Request, res: express.Response) => {
    const id: string = req.params.id;
    UserModel.findOneAndRemove({ _id: id })
      .then((user) => {
        if (user) {
          res.json({
            message: `user ${user.fullname} deleted`,
          });
        }
      })
      .catch(() => {
        res.json({
          message: 'user not found',
        });
      });
  };

  getMe = (req: any, res: express.Response) => {
    const id: string = req.user._id;

    UserModel.findById(id, (err, user) => {
      if (err || !user) {
        return res.status(404).json({
          message: 'not found',
        });
      } else {
        res.json(user);
      }
    });
  };

  verify = (req: express.Request, res: express.Response) => {
    const hash: any = req.query.hash;

    if (!hash) {
      res.status(422).json({
        status: 'Invalid Hash',
      });
    }

    UserModel.findOne({ confirm_hash: hash }, (err, user) => {
      if (err || !user) {
        return res.status(404).json({
          status: 'error',
          message: 'Hash not found',
        });
      }

      user.confirmed = true;

      user.save((err) => {
        if (err) {
          return res.status(404).json({
            status: 'error',
            message: err,
          });
        }

        res.json({
          status: 'success',
          message: 'Аккаунт подтвержден',
        });
      });
    });
  };

  create = (req: express.Request, res: express.Response) => {
    const postData = {
      email: req.body.email,
      fullname: req.body.fullname,
      password: req.body.password,
    };

    const user = new UserModel(postData);

    user
      .save()
      .then((obj: any) => {
        res.json(obj);
      })
      .catch((reason) => {
        res.json({
          status: 'error',
          message: reason,
        });
      });
  };

  login = (req: express.Request, res: express.Response) => {
    const postData = {
      email: req.body.email,
      password: req.body.password,
    };

    UserModel.findOne({ email: postData.email }, (err, user: any) => {
      if (err || !user) {
        return res.status(404).json({
          message: 'not found',
        });
      }

      if (bcrypt.compareSync(postData.password, user.password)) {
        const token = createJWTToken(user);
        res.json({
          status: 'success',
          token,
          user,
        });
      } else {
        res.json({
          status: 'error',
          message: 'incorrect password or email',
        });
      }
    });
  };
}

export default UserController;
