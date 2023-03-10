import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type FileDocument = HydratedDocument<File>;

@Schema({
  timestamps: true,
})
export class File {
  @Prop()
  fileId: string;

  @Prop()
  uidMain: string;

  @Prop()
  content: string;

  @Prop()
  users: User[];
}

export const FileSchema = SchemaFactory.createForClass(File);
