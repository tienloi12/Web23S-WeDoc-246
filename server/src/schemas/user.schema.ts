import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  uid: string;

  @Prop()
  email: string;

  @Prop()
  displayName: string;

  @Prop()
  photoURL: string;

  @Prop({
    default: Array,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'files' }],
  })
  documentFiles: [];
}

export const UserSchema = SchemaFactory.createForClass(User);
