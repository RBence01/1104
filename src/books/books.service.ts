import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  data: Book[] = [];
  create(createBookDto: CreateBookDto) {
    try {
      let id: number = 0;
      if (this.data.length > 0) id = this.data[this.data.length - 1].id + 1;
      this.data.push(new Book(createBookDto, id));
      return true;
    } catch {
      return false
    }
  }

  findAll() {
    return this.data;
  }

  findOne(id: number) {
    const index = this.data.findIndex(e => e.id === id);
    if (index === -1) return null;
    const book: any = this.data[index];
    if (this.data.length -1 > index) book.nextId = this.data[index+1].id;
    else book.nextId = null;
    return book;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    const book = this.data.find(e => e.id === id);
    if (!book) return false;
    book.update(updateBookDto);
    return true;
  }

  remove(id: number) {
    const index = this.data.findIndex(e => e.id === id);
    if (index === -1) return false;
    this.data.splice(index, 1);
    return true;
  }
}
