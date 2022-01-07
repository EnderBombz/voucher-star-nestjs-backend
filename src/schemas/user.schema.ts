import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  userName: String;

  @Prop()
  outsourced: Boolean;

  @Prop()
  area: String;

  @Prop()
  vouchers: [];
}

export const UserSchema = SchemaFactory.createForClass(User);
