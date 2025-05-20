import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConditionDocument = ConditionEntity & Document;

@Schema()
export class ConditionEntity extends Document {
  @Prop({ required: true, unique: true })
  code: string; // 조건 코드 (ex: "login_3days")

  @Prop({ required: true })
  description?: string;

  @Prop({ type: Object })  // 조건 설정값, 예: { minDays: 3 }
  config: Record<string, any>;

  @Prop({ default: true })
  isActive: boolean;
}

export const ConditionSchema = SchemaFactory.createForClass(ConditionEntity);
