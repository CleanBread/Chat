const cloudinary = require('cloudinary');
import express from 'express';
import fs from 'fs';

import { FilesModel } from '../models';

class FilesController {
  create = (req: any, res: express.Response) => {
    const userId = req.user._id;
    const file: any = req.file;

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    cloudinary.v2.uploader
      .upload_stream({ resource_type: 'auto' }, (error: any, result: any) => {
        if (error) {
          throw new Error(error);
        }

        const fileData = {
          filename: result.original_filename,
          size: result.bytes,
          ext: result.format,
          url: result.url,
          user: userId,
        };

        const files = new FilesModel(fileData);

        files
          .save()
          .then((fileObj: any) => {
            res.json({
              status: 'success',
              file: fileObj,
            });
          })
          .catch((err: any) => {
            res.json({
              status: 'error',
              message: err,
            });
          });
      })
      .end(file.buffer);
  };

  delete = () => {};
}

export default FilesController;
