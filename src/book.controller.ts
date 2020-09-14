import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './Book';
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async findAll(@Query() query: Book): Promise<Book[]> {
    if (query.author) {
      return this.bookService.findAllByAuthor(query.author);
    } else {
      return this.bookService.findAll();
    }
  }
  @Get('/:bookName')
  async getBookByName(@Param('bookName') bookName: string): Promise<Book> {
    return this.bookService.getBookByName(bookName);
  }
  @Post()
  async create(@Body() book: Book): Promise<string> {
    this.bookService.create(book);
    return 'Book have been Created';
  }
  @Delete('/:bookName')
  async delete(@Param('bookName') bookName: string): Promise<string> {
    this.bookService.deleteBook(bookName);
    return 'Book have been Deleted';
  }
}
