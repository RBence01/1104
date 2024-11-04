import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpCode } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Response } from 'express';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto, @Res() res: Response) {
    const status: boolean = this.booksService.create(createBookDto);
    if (status) res.sendStatus(201);
    else res.sendStatus(400);
  }

  @HttpCode(200)
  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    const book = this.booksService.findOne(+id);
    if (!book) res.sendStatus(404);
    else {
      res.send(book);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto, @Res() res: Response) {
    const status = this.booksService.update(+id, updateBookDto);
    if (status) res.sendStatus(200);
    else res.sendStatus(404);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    const status = this.booksService.remove(+id);
    if (status) res.sendStatus(204);
    else res.sendStatus(404);
  }
}
