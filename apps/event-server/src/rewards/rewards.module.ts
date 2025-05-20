import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RewardsService } from './rewards.service';
import { RewardsController } from './rewards.controller';
import { RewardEntity, RewardSchema } from './entities/reward.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: RewardEntity.name, schema: RewardSchema }])],
  providers: [RewardsService],
  controllers: [RewardsController],
  exports: [RewardsService],
})
export class RewardsModule {}
