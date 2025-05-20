import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RewardEntity, RewardDocument } from './entities/reward.entity';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';

@Injectable()
export class RewardsService {
  constructor(
    @InjectModel(RewardEntity.name) private rewardModel: Model<RewardDocument>,
  ) {}

  async create(createRewardDto: CreateRewardDto): Promise<RewardEntity> {
    const reward = new this.rewardModel(createRewardDto);
    return reward.save();
  }

  async findByEvent(eventId: string): Promise<RewardEntity[]> {
    return this.rewardModel.find({ eventId }).exec();
  }

  async findAll(): Promise<RewardEntity[]> {
    return this.rewardModel.find().exec();
  }

  async findOne(id: string): Promise<RewardEntity> {
    const reward = await this.rewardModel.findById(id).exec();
    if (!reward) throw new NotFoundException('Reward not found');
    return reward;
  }

  async update(
    id: string,
    updateRewardDto: UpdateRewardDto,
  ): Promise<RewardEntity> {
    const updated = await this.rewardModel
      .findByIdAndUpdate(id, updateRewardDto, { new: true })
      .exec();

    if (!updated) throw new NotFoundException('Reward not found');
    return updated;
  }

  async deactivate(id: string): Promise<boolean> {
    const reward = await this.rewardModel.findById(id);
    if (!reward) {
      return false;
    }
    reward.isActive = false;
    await reward.save();
    return true;
  }

  async remove(id: string): Promise<RewardEntity> {
    const deleted = await this.rewardModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Reward not found');
    return deleted;
  }
}
