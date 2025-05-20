import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  ConditionEntity,
  ConditionDocument,
} from './entities/condition.entity';
import { CreateConditionDto } from './dto/create-condition.dto';
import { UpdateConditionDto } from './dto/update-condition.dto';

@Injectable()
export class ConditionsService {
  constructor(
    @InjectModel(ConditionEntity.name)
    private conditionModel: Model<ConditionDocument>,
  ) {}

  async create(
    createConditionDto: CreateConditionDto,
  ): Promise<ConditionEntity> {
    // 중복 code 체크
    const exists = await this.conditionModel
      .findOne({ code: createConditionDto.code })
      .exec();
    if (exists) {
      throw new Error('Condition code already exists');
    }

    const created = new this.conditionModel(createConditionDto);
    return created.save();
  }

  async findAll(): Promise<ConditionEntity[]> {
    return this.conditionModel.find().exec();
  }

  async findOne(id: string): Promise<ConditionEntity> {
    const condition = await this.conditionModel.findById(id).exec();
    if (!condition) throw new NotFoundException('Condition not found');
    return condition;
  }

  async update(
    id: string,
    updateConditionDto: UpdateConditionDto,
  ): Promise<ConditionEntity> {
    const updated = await this.conditionModel
      .findByIdAndUpdate(id, updateConditionDto, { new: true })
      .exec();

    if (!updated) throw new NotFoundException('Condition not found');
    return updated;
  }

  async deactivate(id: string): Promise<boolean> {
    const condition = await this.conditionModel.findById(id);
    if (!condition) {
      return false;
    }
    condition.isActive = false;
    await condition.save();
    return true;
  }

  async remove(id: string): Promise<ConditionEntity> {
    const deleted = await this.conditionModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Condition not found');
    return deleted;
  }
}
