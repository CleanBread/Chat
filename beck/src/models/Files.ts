import mongoose, { Schema, Document } from 'mongoose';

export interface IFiles extends Document {
  filename: string;
  size: number;
  url: string;
  ext: string;
  message: string;
  user: string;
}

const FilesSchema = new Schema(
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

const FilesModel = mongoose.model<IFiles>('Files', FilesSchema);

export default FilesModel;
