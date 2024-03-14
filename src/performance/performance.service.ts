import _ from 'lodash';
import { parse } from 'papaparse';
import { Repository } from 'typeorm';

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePerformanceDto } from './dto/create-performance.dto';
import { UpdatePerformanceDto } from './dto/update-performance.dto';
import { Performance } from './entities/performance.entity';

@Injectable()
export class PerformanceService {
  constructor(@InjectRepository(Performance)
  private readonly performanceRepository: Repository<Performance>,
  ){}

  async create(createPerformanceDto: CreatePerformanceDto) {
    return (await this.performanceRepository.save(createPerformanceDto)).id;
  }

  async findAll(): Promise<Performance[]> {
    return await this.performanceRepository.find({
      select: ['id']
    });
  }

  async findOne(id: number) {
    return await this.verifyPerformanceById(id);
  }

  private async verifyPerformanceById(id: number){
    const performance = await this.performanceRepository.findOneBy({ id });
    if (_.isNil(performance)) {
      throw new NotFoundException('존재하지 않는 공연입니다.');
    }

    return performance;
  }

  // update(id: number, updatePerformanceDto: UpdatePerformanceDto) {
  //   return `This action updates a #${id} performance`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} performance`;
  // }
}
