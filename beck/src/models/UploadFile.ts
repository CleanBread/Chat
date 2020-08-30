import mongoose, { Schema, Document } from 'mongoose';

export interface IUploadFile extends Document {
  filename: string;
  size: number;
  url: string;
  ext: string;
  message: string;
  user: string;
}

const UploadFileSchema = new Schema(
  {
    filename: String,
    size: Number,
    url: String,
    ext: String,
    message: {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

const UploadFileModel = mongoose.model<IUploadFile>(
  'UploadFile',
  UploadFileSchema,
);

export default UploadFileModel;
