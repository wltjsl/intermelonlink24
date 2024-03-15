import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Performance } from './entities/performance.entity';
import { PerformanceService } from './performance.service';
import { PerformanceController } from './performance.controller';
import { Schedule } from './entities/schedule.entity';
import { Seat } from './entities/seat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Performance, Schedule, Seat])],
  controllers: [PerformanceController],
  providers: [PerformanceService],
})
export class PerformanceModule {}
