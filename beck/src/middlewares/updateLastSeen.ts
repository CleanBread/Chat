import { UserModel } from '../models';
import express from 'express';

export default (
  req: any,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (req.user) {
    UserModel.findOneAndUpdate(
      { _id: req.user._id },
      {
        last_seen: new Date(),
      },
      { new: true },
      () => {},
    );
  }

  next();
};
