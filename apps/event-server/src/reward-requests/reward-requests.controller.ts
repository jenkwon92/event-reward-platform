import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RewardRequestsService } from './reward-requests.service';
import { CreateRewardRequestDto } from './dto/create-reward-request.dto';

import { Role } from '@common/enums/roles.enum';
import { Roles } from '@common/decorators/roles.decorator';
import { RolesGuard } from '@common/guards/roles.guard';


@Controller('reward-requests')
@UseGuards(RolesGuard)
export class RewardRequestsController {
  constructor(private readonly rewardRequestsService: RewardRequestsService) {}

  // 보상 요청 생성 - USER만 가능
  @Post()
  @Roles(Role.USER)
  create(@Request() req, @Body() dto: CreateRewardRequestDto) {
    const userId = req.user.userId; // JWT 인증 미들웨어에서 userId 세팅 가정
    return this.rewardRequestsService.create(userId, dto.eventId, dto.rewardId);
  }

  // 모든 보상 요청 조회 - AUDITOR, OPERATOR, ADMIN 가능
  @Get()
  @Roles(Role.AUDITOR, Role.OPERATOR, Role.ADMIN)
  findAll() {
    return this.rewardRequestsService.findAll();
  }

  // 특정 유저의 요청 조회 - 자신의 요청만 조회 가능 (USER)
  @Get('my')
  @Roles(Role.USER)
  getMyRequests(@Request() req) {
    const userId = req.user.id;
    return this.rewardRequestsService.findByUser(userId);
  }

  // 보상 요청 상태 변경 - OPERATOR, ADMIN만 가능
  @Patch(':id/status')
  @Roles(Role.OPERATOR, Role.ADMIN)
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: any, // enum으로 강화 추천
  ) {
    return this.rewardRequestsService.updateStatus(id, status);
  }
}
