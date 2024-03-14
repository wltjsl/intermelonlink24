import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Performance } from './entities/performance.entity';
import { PerformanceService } from './performance.service';
import { PerformanceController } from './performance.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Performance])],
  controllers: [PerformanceController],
  providers: [PerformanceService],
})
export class PerformanceModule {}
