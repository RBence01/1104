import { CreateBookDto } from "../dto/create-book.dto";
import { UpdateBookDto } from "../dto/update-book.dto";

export class Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publishYear: number;
  reserved: boolean;

  constructor(dto: CreateBookDto, id: number) {
    this.id = id;
    this.title = dto.title;
    this.author = dto.author;
    this.isbn = dto.isbn;
    this.publishYear = dto.publishYear;
    this.reserved = false;
  }

  update(dto: UpdateBookDto) {
    if (dto.title) this.title = dto.title;
    if (dto.author) this.author = dto.author;
    if (dto.isbn) this.isbn = dto.isbn;
    if (dto.publishYear) this.publishYear = dto.publishYear;
    if (dto.reserved) this.reserved = dto.reserved;
  }
}
