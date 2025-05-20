import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { RequestStatus } from '@common/enums/request-status.enum';

export type RewardRequestDocument = RewardRequestEntity & Document;

@Schema({ timestamps: true })
export class RewardRequestEntity extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: 'UserEntity' })
  userId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'EventEntity' })
  eventId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'RewardEntity' })
  rewardId: Types.ObjectId;

  @Prop({ default: RequestStatus.PENDING, enum: RequestStatus })
  status: RequestStatus;

  @Prop({ type: String })
  note?: string;
}

export const RewardRequestSchema = SchemaFactory.createForClass(RewardRequestEntity);
