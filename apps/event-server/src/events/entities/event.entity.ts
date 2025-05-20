import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EventDocument = EventEntity & Document;

@Schema({ timestamps: true })
export class EventEntity extends Document {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ default: true })
  isActive: boolean;

  // 조건 연결 (Condition의 _id 배열)
  @Prop({ type: [Types.ObjectId], ref: 'ConditionEntity', default: [] })
  conditionIds: Types.ObjectId[];

  // AND/OR 지정
  @Prop({ enum: ['AND', 'OR'], default: 'AND' })
  conditionLogic: 'AND' | 'OR';
}

export const EventSchema = SchemaFactory.createForClass(EventEntity);
