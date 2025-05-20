import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RewardRequestsService } from './reward-requests.service';
import { RewardRequestsController } from './reward-requests.controller';
import { RewardRequestEntity, RewardRequestSchema } from './entities/reward-request.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: RewardRequestEntity.name, schema: RewardRequestSchema }])],
  providers: [RewardRequestsService],
  controllers: [RewardRequestsController],
  exports: [RewardRequestsService],
})
export class RewardRequestsModule {}
