import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { createPool, Pool } from 'mysql2/promise'

@Injectable()
export class BooksService {
  connection: Pool;
  data: Book[] = [];
  constructor() {
    this.connection = createPool({
      host: 'localhost',
      user: 'root',
      database: 'konyvtar'
    });
  }

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

  async findAll() {
    const [data] = await this.connection.query('SELECT * FROM books');
    return data;
  }

  findOne(id: number) {
    //this.connection.query('SELECT * FROM books WHERE id === ?', id);
    const index = this.data.findIndex(e => e.id === id);
    if (index === -1) return null;
    const book: any = this.data[index];
    if (this.data.length - 1 > index) book.nextId = this.data[index + 1].id;
    else book.nextId = null;
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const [data] = await this.connection.query('SELECT * FROM books WHERE id = ?', [id]);
    const books: Book[] = data as Book[];
    if (books.length != 1) return false;
    const newBook = {...books[0], ...updateBookDto}
    await this.connection.query('UPDATE SET title = ?, author = ?, isbn = ?, publishYear = ?, reserved = ? WHERE id = ?',
      [newBook.title, newBook.author, newBook.isbn, newBook.publishYear, newBook.reserved, newBook.id]
    )
    return true;
  }

  remove(id: number) {
    const index = this.data.findIndex(e => e.id === id);
    if (index === -1) return false;
    this.data.splice(index, 1);
    return true;
  }
}
