import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { EventsModule } from './events/events.module';
import { RewardsModule } from './rewards/rewards.module';
import { RewardRequestsModule } from './reward-requests/reward-requests.module';
import { ConditionModule } from './conditions/conditions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    EventsModule,
    RewardsModule,
    RewardRequestsModule,
    ConditionModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
