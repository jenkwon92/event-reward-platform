// condition.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConditionEntity, ConditionSchema } from './entities/condition.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ConditionEntity.name, schema: ConditionSchema }]),
  ],
  exports: [MongooseModule],
})
export class ConditionModule {}
