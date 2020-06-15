import { UserModel } from "../models";
import express from "express";

export default (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  UserModel.findOneAndUpdate(
    { _id: "5eca53c7354ccc3e44f72fcb" },
    {
      $set: {
        last_seen: new Date(),
      },
    },
    { new: true },
    () => {}
  );

  next();
};
