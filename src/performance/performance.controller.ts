import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/user/types/userRole.type';

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PerformanceService } from './performance.service';
import { CreatePerformanceDto } from './dto/create-performance.dto';
import { UpdatePerformanceDto } from './dto/update-performance.dto';

@UseGuards(RolesGuard)
@Controller('performance')
export class PerformanceController {
  constructor(private readonly performanceService: PerformanceService) {}

  @Get()
  findAll() {
    return this.performanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.performanceService.findOne(+id);
  }

  @Roles(Role.Admin)
  @Post()
  create(@Body() createPerformanceDto: CreatePerformanceDto) {
    return this.performanceService.create(createPerformanceDto);
  }

  // 수정 삭제는 보류
  // @Roles(Role.Admin)
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePerformanceDto: UpdatePerformanceDto) {
  //   return this.performanceService.update(+id, updatePerformanceDto);
  // }

  // @Roles(Role.Admin)
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.performanceService.remove(+id);
  // }
}
