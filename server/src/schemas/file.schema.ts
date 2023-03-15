import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User, UserDocument } from './user.schema';

export type FileDocument = HydratedDocument<File>;

@Schema({
  timestamps: true,
})
export class File {
  @Prop({
    require: true,
  })
  fileId: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  })
  authorId: UserDocument;

  @Prop({
    required: true,
    default: 'Untitled',
  })
  title: string;

  @Prop()
  content: string;

  @Prop({
    default: Array,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
  })
  collaborators: UserDocument[];
}

export const FileSchema = SchemaFactory.createForClass(File);
