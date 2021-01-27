import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserM } from '../../user-m/schemas/user-m.schema';

export type GroupMDocument = GroupM & Document;

@Schema()
export class GroupM {
  @Prop({ required: true })
  group_name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: () => UserM }] })
  members: UserM[] | Types.ObjectId[] | string[];
}

export const GroupMSchema = SchemaFactory.createForClass(GroupM);
