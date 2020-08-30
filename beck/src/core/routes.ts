import socket from 'socket.io';
import express from 'express';

import {
  UserController,
  DialogController,
  MessageController,
  UploadFileController,
} from '../controllers';

import { loginValidation } from '../utils/validations';
import uploader from './uploader';

export const createRoutes = (app: express.Express, io: socket.Server) => {
  const User = new UserController(io);
  const Dialog = new DialogController(io);
  const Messages = new MessageController(io);
  const UploadFile = new UploadFileController();

  app.get('/user/me', User.getMe);
  app.get('/user/verify', User.verify);
  app.get('/user/find', User.findUsers);
  app.get('/user/:id', User.show);
  app.post('/user/registration', User.create);
  app.post('/user/login', loginValidation, User.login);
  app.delete('/user/:id', User.delete);

  app.get('/dialogs', Dialog.index);
  app.delete('/dialogs/:id', Dialog.delete);
  app.post('/dialogs', Dialog.create);

  app.get('/messages', Messages.index);
  app.post('/messages', Messages.create);
  app.delete('/messages/:id', Messages.delete);

  app.post('/files', uploader.single('file'), UploadFile.create);
  // app.delete('/files/:id', UploadFileController.delete);

  app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello');
  });
};
