import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccountDocument = Account & Document;

@Schema()
export class Account {
  @Prop()
  userName: String;

  @Prop()
  outsourced: Boolean;

  @Prop()
  level: Number;

  @Prop()
  email: String;

  @Prop()
  password: String;

  @Prop()
  isOnline: Boolean;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
