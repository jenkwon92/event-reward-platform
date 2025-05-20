import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '@common/enums/roles.enum';

export type UserDocument = UserEntity & Document;

@Schema()
export class UserEntity extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, enum: Role, default: Role.USER }) // 기본 역할 USER
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
