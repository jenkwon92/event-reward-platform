import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  RewardRequestEntity,
  RewardRequestDocument,
} from './entities/reward-request.entity';
import { RequestStatus } from '@common/enums/request-status.enum';


@Injectable()
export class RewardRequestsService {
  constructor(
    @InjectModel(RewardRequestEntity.name)
    private rewardRequestModel: Model<RewardRequestDocument>,
  ) {}

  // 보상 요청 생성 (조건 검증 로직은 실제 서비스에 맞게 구현)
  async create(
    userId: string,
    eventId: string,
    rewardId: string,
  ): Promise<RewardRequestEntity> {
    // 중복 요청 방지 예시
    const existing = await this.rewardRequestModel.findOne({
      userId,
      eventId,
      rewardId,
      status: { $in: [RequestStatus.PENDING, RequestStatus.APPROVED] },
    });

    if (existing)
      throw new BadRequestException(
        '이미 보상 요청 중이거나 완료된 요청이 있습니다.',
      );

    // 조건 검증 로직(예: 이벤트 조건 충족) - 생략, 서비스 로직에서 구현

    const newRequest = new this.rewardRequestModel({
      userId,
      eventId,
      rewardId,
    });
    return newRequest.save();
  }

  async findAll() {
    return this.rewardRequestModel
      .find()
      .populate('userId eventId rewardId')
      .exec();
  }

  async findByUser(userId: string) {
    return this.rewardRequestModel
      .find({ userId })
      .populate('eventId rewardId')
      .exec();
  }

  async updateStatus(
    id: string,
    status: RequestStatus,
  ): Promise<RewardRequestEntity> {
    const updated = await this.rewardRequestModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Request not found');
    return updated;
  }
}
