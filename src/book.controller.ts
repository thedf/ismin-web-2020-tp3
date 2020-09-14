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
import { BookDocument, BookSchema } from './Book.schema';
import { PaginationAndAuthor, Search } from './Search';
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async findAll(@Query() query: PaginationAndAuthor): Promise<Book[]> {
    const after = query.after | 0;
    const count = query.count | 0;
    if (query.author) {
      return (await this.bookService.findAllByAuthor(query.author)).slice(
        after,
        count === 0 ? undefined : after + count,
      );
    } else {
      return (await this.bookService.findAll()).slice(
        after,
        count === 0 ? undefined : after + count,
      );
    }
  }
  @Get('/:bookName')
  async getBookByName(@Param('bookName') bookName: string): Promise<Book> {
    return this.bookService.getBookByName(bookName);
  }
  @Post()
  async create(@Body() book: Book): Promise<Book> {
    if (typeof book.title === 'string' && typeof book.author === 'string') {
      this.bookService.create(book);
      return book;
    }
  }
  @Post('/search')
  async search(
    @Body() searchParams: Search,
    @Query() query: PaginationAndAuthor,
  ): Promise<Book[]> {
    const after = query.after | 0;
    const count = query.count | 0;
    return (await this.bookService.search(searchParams)).slice(
      after,
      count === 0 ? undefined : after + count,
    );
  }
  @Delete('/:bookName')
  async delete(@Param('bookName') bookName: string): Promise<string> {
    this.bookService.deleteBook(bookName);
    return 'Book have been Deleted';
  }
}
