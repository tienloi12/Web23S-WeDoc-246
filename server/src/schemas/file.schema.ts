import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

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
  authorId: User;

  @Prop()
  content: string;

  @Prop({
    default: Array,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
  })
  collaborators: User[];
}

export const FileSchema = SchemaFactory.createForClass(File);
