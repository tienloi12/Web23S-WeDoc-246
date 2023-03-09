import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserModel } from 'src/models/user.model';

export type FileDocument = HydratedDocument<File>;

@Schema()
export class File {
  @Prop()
  fileId: string;

  @Prop()
  uidMain: string;

  @Prop()
  content: string;

  @Prop()
  users: UserModel[];
}

export const FileSchema = SchemaFactory.createForClass(File);
