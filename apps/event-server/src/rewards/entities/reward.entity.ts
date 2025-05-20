import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RewardDocument = RewardEntity & Document;

@Schema({ timestamps: true })
export class RewardEntity extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: 'EventEntity' })
  eventId: Types.ObjectId;

  @Prop({ required: true })
  type: string; // 예: 'point', 'item', 'coupon'

  @Prop({ required: true })
  amount: number;

  @Prop()
  description?: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const RewardSchema = SchemaFactory.createForClass(RewardEntity);
