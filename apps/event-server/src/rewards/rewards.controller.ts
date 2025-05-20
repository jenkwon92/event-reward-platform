import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';

import { Role } from '@common/enums/roles.enum';
import { Roles } from '@common/decorators/roles.decorator';
import { RolesGuard } from '@common/guards/roles.guard';

@Controller('rewards')
@UseGuards(RolesGuard)
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  // 보상 생성 - OPERATOR, ADMIN만 가능
  @Post()
  @Roles(Role.OPERATOR, Role.ADMIN)
  create(@Body() createRewardDto: CreateRewardDto) {
    return this.rewardsService.create(createRewardDto);
  }

  // 전체 보상 조회 - AUDITOR, OPERATOR, ADMIN 가능
  @Get()
  @Roles(Role.AUDITOR, Role.OPERATOR, Role.ADMIN)
  findAll() {
    return this.rewardsService.findAll();
  }

  // 이벤트별 보상 조회 - AUDITOR, OPERATOR, ADMIN 가능
  @Get('event/:eventId')
  @Roles(Role.AUDITOR, Role.OPERATOR, Role.ADMIN)
  findByEvent(@Param('eventId') eventId: string) {
    return this.rewardsService.findByEvent(eventId);
  }

  // 단일 보상 조회 - AUDITOR, OPERATOR, ADMIN 가능
  @Get(':id')
  @Roles(Role.AUDITOR, Role.OPERATOR, Role.ADMIN)
  findOne(@Param('id') id: string) {
    return this.rewardsService.findOne(id);
  }

  // 보상 수정 - OPERATOR, ADMIN만 가능
  @Patch(':id')
  @Roles(Role.OPERATOR, Role.ADMIN)
  update(@Param('id') id: string, @Body() updateRewardDto: UpdateRewardDto) {
    return this.rewardsService.update(id, updateRewardDto);
  }

  // 보상 삭제 - ADMIN만 가능
  @Delete(':id')
  @Roles(Role.ADMIN)
  async deactivate(@Param('id') id: string) {
    const result = await this.rewardsService.deactivate(id);
    if (!result) {
      throw new NotFoundException('Reward not found');
    }
    return { message: 'Reward deactivated successfully' };
  }
}
