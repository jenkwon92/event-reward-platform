import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { EventEntity, EventDocument } from './entities/event.entity';
import {
  ConditionEntity,
  ConditionDocument,
} from '../conditions/entities/condition.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(EventEntity.name) private eventModel: Model<EventDocument>,
    @InjectModel(ConditionEntity.name)
    private conditionModel: Model<ConditionDocument>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<EventEntity> {
    const existing = await this.eventModel.findOne({
      code: createEventDto.code,
    });
    if (existing) {
      throw new Error('Event code already exists');
    }

    // conditionCodes -> ObjectId 배열 변환 처리
    let conditionIds: Types.ObjectId[] = [];
    if (
      createEventDto.conditionCodes &&
      createEventDto.conditionCodes.length > 0
    ) {
      const conditions = await this.conditionModel
        .find({
          code: { $in: createEventDto.conditionCodes },
        })
        .exec();

      if (conditions.length !== createEventDto.conditionCodes.length) {
        throw new NotFoundException('Some condition codes not found');
      }
      conditionIds = conditions.map((cond) => cond._id as Types.ObjectId);
    }

    const createdEvent = new this.eventModel({
      ...createEventDto,
      conditionIds,
    });
    return createdEvent.save();
  }

  async findAll(): Promise<EventEntity[]> {
    return this.eventModel.find().exec();
  }

  async findOne(id: string): Promise<EventEntity> {
    const event = await this.eventModel.findById(id).exec();
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  async findByCode(code: string): Promise<EventEntity> {
    const event = await this.eventModel.findOne({ code }).exec();
    if (!event) throw new NotFoundException('Event not found by code');
    return event;
  }

  async update(
    id: string,
    updateEventDto: UpdateEventDto,
  ): Promise<EventEntity> {
    const updated = await this.eventModel
      .findByIdAndUpdate(id, updateEventDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Event not found');
    return updated;
  }

  async deactivate(id: string): Promise<boolean> {
    const event = await this.eventModel.findById(id);
    if (!event) {
      return false;
    }
    event.isActive = false;
    await event.save();
    return true;
  }

  async remove(id: string): Promise<EventEntity> {
    const deleted = await this.eventModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException('Event not found');
    }
    return deleted;
  }
}
