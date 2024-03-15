import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePerformanceDto } from './dto/create-performance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Performance } from './entities/performance.entity';
import { Like, Repository } from 'typeorm';
import { FindAllPerformanceDto } from './dto/find-all-performance.dto';

@Injectable()
export class PerformanceService {
  constructor(
    @InjectRepository(Performance) private readonly performanceRepository: Repository<Performance>,
  ) {}

  async create(createPerformanceDto: CreatePerformanceDto) {
    const { schedules, seats, ...restOfPerformance } = createPerformanceDto;

    const existedPerformance = await this.performanceRepository.findOneBy({
      title: createPerformanceDto.title,
    });

    if (existedPerformance) {
      throw new BadRequestException('이미 사용 중인 공연명입니다.');
    }

    const performance = await this.performanceRepository.save({
      ...restOfPerformance,
      schedules: schedules.map((schedule) => ({
        ...schedule,
        seat: {
          availableSeats: seats,
          totalSeats: seats,
        },
      })),
    });

    return performance;
  }

  async findAll({ keyword, category }: FindAllPerformanceDto) {
    const performances = await this.performanceRepository.find({
      where: {
        ...(keyword && { title: Like(`%${keyword}%`) }),
        ...(category && { category }),
      },
    });

    return performances;
  }

  async findOne(id: number) {
    const performance = await this.performanceRepository.findOne({
      where: { id },
      relations: {
        schedules: {
          seat: true,
        },
      },
    });

    if (!performance) {
      throw new NotFoundException('공연을 찾을 수 없습니다.');
    }

    return performance;
  }
}