import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  text: {
    type: string;
    required: boolean;
  };
  dialog: {
    type: Schema.Types.ObjectId;
    ref: string;
    required: true;
  };
}

const MessageSchema = new Schema(
  {
    text: {
      type: String,
      required: Boolean,
    },
    dialog: {
      type: Schema.Types.ObjectId,
      ref: 'Dialog',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    files: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Files',
      },
    ],
    readed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    usePushEach: true,
  },
);

const MessageModel = mongoose.model<IMessage>('Message', MessageSchema);

export default MessageModel;
