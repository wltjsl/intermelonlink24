import { RolesGuard } from 'src/auth/roles.guard';

import { UseGuards, Controller, Get, Post, Body, Request, HttpStatus, Param } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';

@UseGuards(RolesGuard)
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Request() req, @Body() createBookDto: CreateBookDto) {
    const userId = req.user.id;
    const data = await this.bookService.create(userId, createBookDto);

    return {
      statusCode: HttpStatus.CREATED,
      message: '예매에 성공했습니다.',
      data,
    };
  }

  @Get()
  async findAll(@Request() req) {
    const userId = req.user.id;
    const data = await this.bookService.findAll(userId);

    return {
      statusCode: HttpStatus.OK,
      message: '예매 목록 조회에 성공했습니다.',
      data,
    };
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: number) {
    const userId = req.user.id;
    return this.bookService.findOne(id, userId);
  }
}
