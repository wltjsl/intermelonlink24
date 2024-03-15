import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Seat } from 'src/performance/entities/seat.entity';
import { Schedule } from 'src/performance/entities/schedule.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BookService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  async create(userId: number, { scheduleId }: CreateBookDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const schedule = await queryRunner.manager.findOne(Schedule, {
        where: { id: scheduleId },
        relations: {
          performance: true,
        },
      });

      if (!schedule) {
        throw new NotFoundException('공연 회차 정보가 없습니다.');
      }

      const book = await queryRunner.manager.save(Book, {
        userId,
        scheduleId,
      });

      const price = schedule.performance.price;
      const user = await queryRunner.manager.findOneBy(User, { id: userId });

      const afterPaidPoints = user.points - price;
      if (afterPaidPoints < 0) {
        throw new BadRequestException('포인트가 부족합니다.');
      }
      user.points = afterPaidPoints;
      await queryRunner.manager.save(User, user);

      const seat = await queryRunner.manager.findOneBy(Seat, { scheduleId });
      const afterBookedSeats = seat.availableSeats - 1;
      if (afterBookedSeats < 0) {
        throw new BadRequestException('예매 가능한 좌석이 없습니다.');
      }
      seat.availableSeats = afterBookedSeats;
      await queryRunner.manager.save(Seat, seat);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return book;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      console.error(err);
      throw err;
    }
  }

  async findAll(userId: number) {
    const books = await this.bookRepository.find({
      where: { userId },
      relations: {
        schedule: {
          performance: true,
        },
      },
    });

    return books;
  }

  async findOne(id: number, userId: number) {
    const book = await this.bookRepository.findOne({
      where: { id, userId },
      relations: {
        schedule: {
          performance: true,
        },
      },
    });

    if (!book) {
      throw new NotFoundException('예매 정보를 찾을 수 없습니다.');
    }

    return book;
  }
}