import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ConditionsService } from './conditions.service';
import { CreateConditionDto } from './dto/create-condition.dto';
import { UpdateConditionDto } from './dto/update-condition.dto';

import { Role } from '@common/enums/roles.enum';
import { Roles } from '@common/decorators/roles.decorator';
import { RolesGuard } from '@common/guards/roles.guard';

@Controller('conditions')
@UseGuards(RolesGuard)
export class ConditionsController {
  constructor(private readonly conditionsService: ConditionsService) {}

  // 조건 생성: OPERATOR, ADMIN만 가능
  @Post()
  @Roles(Role.OPERATOR, Role.ADMIN)
  async create(@Body() createConditionDto: CreateConditionDto) {
    return this.conditionsService.create(createConditionDto);
  }

  // 조건 전체 조회: AUDITOR, OPERATOR, ADMIN 가능
  @Get()
  @Roles(Role.AUDITOR, Role.OPERATOR, Role.ADMIN)
  async findAll() {
    return this.conditionsService.findAll();
  }

  // 조건 단일 조회: AUDITOR, OPERATOR, ADMIN 가능
  @Get(':id')
  @Roles(Role.AUDITOR, Role.OPERATOR, Role.ADMIN)
  async findOne(@Param('id') id: string) {
    const condition = await this.conditionsService.findOne(id);
    if (!condition) throw new NotFoundException('Condition not found');
    return condition;
  }

  // 조건 수정: OPERATOR, ADMIN만 가능
  @Patch(':id')
  @Roles(Role.OPERATOR, Role.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() updateConditionDto: UpdateConditionDto,
  ) {
    const updated = await this.conditionsService.update(id, updateConditionDto);
    if (!updated) throw new NotFoundException('Condition not found');
    return updated;
  }

  // 조건 삭제 대신 비활성화 처리
  @Delete(':id')
  @Roles(Role.ADMIN)
  async deactivate(@Param('id') id: string) {
    const result = await this.conditionsService.deactivate(id);
    if (!result) {
      throw new NotFoundException('Condition not found');
    }
    return { message: 'Condition deactivated successfully' };
  }
}
