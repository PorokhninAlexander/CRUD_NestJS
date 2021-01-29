import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { GroupM } from '../../group-m/schemas/group-m.schema';

export type UserMDocument = UserM & Document;

@Schema()
export class UserM {
  @Prop({ required: true })
  user_name: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: () => GroupM }],
    required: false,
  })
  groups: GroupM[] | Types.ObjectId[] | string[];

  @Prop({ type: [{ type: Types.ObjectId, ref: () => UserM }] })
  friends: UserM[] | Types.ObjectId[] | string[];
}

export const UserMSchema = SchemaFactory.createForClass(UserM);
