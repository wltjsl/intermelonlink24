import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/user/types/userRole.type';

import {   Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  Query,
  UseGuards } from '@nestjs/common';
import { PerformanceService } from './performance.service';
import { CreatePerformanceDto } from './dto/create-performance.dto';
import { FindAllPerformanceDto } from './dto/find-all-performance.dto';

@UseGuards(RolesGuard)
@Controller('performance')
export class PerformanceController {
  constructor(private readonly performanceService: PerformanceService) {}

  @Get()
  async findAll(@Query() findAllPerformanceDto: FindAllPerformanceDto) {
    const data = await this.performanceService.findAll(findAllPerformanceDto);

    return {
      statusCode: HttpStatus.OK,
      message: '공연 목록 조회에 성공했습니다.',
      data,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.performanceService.findOne(id);

    return {
      statusCode: HttpStatus.OK,
      message: '공연 상세 조회에 성공했습니다.',
      data,
    };
  }

  @Roles(Role.Admin)
  @Post()
  async create(@Body() createPerformanceDto: CreatePerformanceDto) {
    const data = await this.performanceService.create(createPerformanceDto);

    return {
      statusCode: HttpStatus.CREATED,
      message: '공연 생성에 성공했습니다.',
      data,
    };
  }
}
