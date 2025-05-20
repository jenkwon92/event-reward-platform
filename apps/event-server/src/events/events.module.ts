import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { EventEntity, EventSchema } from './entities/event.entity';
import { ConditionEntity, ConditionSchema } from '../conditions/entities/condition.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EventEntity.name, schema: EventSchema }, 
      { name: ConditionEntity.name, schema: ConditionSchema }, 
    ]),
    
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
