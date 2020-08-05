import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { createServer } from 'http';
import cors from 'cors';

import { updateLastSeen, checkAuth } from './middlewares';
import { createRoutes } from './core/routes';
import createSocket from './core/socket';

dotenv.config();

const app = express();
const http = createServer(app);
const io = createSocket(http);
const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.use(bodyParser.json());
app.use(updateLastSeen);
app.use(cors(corsOptions));
app.use(checkAuth);

createRoutes(app, io);

mongoose.connect('mongodb://localhost:27017/chat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

http.listen(process.env.PORT, function () {
  console.log(`server: http://localhost:${process.env.PORT}`);
});
// mongod --dbpath ./db
