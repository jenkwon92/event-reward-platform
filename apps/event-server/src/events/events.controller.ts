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
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';

import { Role } from '@common/enums/roles.enum';
import { Roles } from '@common/decorators/roles.decorator';
import { RolesGuard } from '@common/guards/roles.guard';

@Controller('events')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  // 이벤트 생성: OPERATOR, ADMIN만
  @Post()
  @Roles(Role.OPERATOR, Role.ADMIN)
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  // 이벤트 전체 조회: AUDITOR, OPERATOR, ADMIN
  @Get()
  @Roles(Role.AUDITOR, Role.OPERATOR, Role.ADMIN)
  findAll() {
    return this.eventsService.findAll();
  }

  // 단일 조회: AUDITOR, OPERATOR, ADMIN
  @Get(':id')
  @Roles(Role.AUDITOR, Role.OPERATOR, Role.ADMIN)
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  // code로 조회: AUDITOR, OPERATOR, ADMIN
  @Get('code/:code')
  @Roles(Role.AUDITOR, Role.OPERATOR, Role.ADMIN)
  findByCode(@Param('code') code: string) {
    return this.eventsService.findByCode(code);
  }

  // 이벤트 수정: OPERATOR, ADMIN
  @Patch(':id')
  @Roles(Role.OPERATOR, Role.ADMIN)
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  // 이벤트 삭제 대신 비활성화 처리
  @Delete(':id')
  @Roles(Role.ADMIN)
  async deactivate(@Param('id') id: string) {
    const result = await this.eventsService.deactivate(id);
    if (!result) {
      throw new NotFoundException('Event not found');
    }
    return { message: 'Event deactivated successfully' };
  }
}
