import { Injectable } from '@nestjs/common';
import { Bookshelf } from './Bookshelf';
import { Book } from './Book';
@Injectable()
export class BookService {
  OurBookshelf = new Bookshelf();
  //   theLordOfTheRings = {
  //     title: 'The Lord of the Rings',
  //     author: 'J. R. R. Tolkien',
  //     date: new Date('1954-02-15'),
  //   };
  //   theHobbit = {
  //     title: 'The Hobbit',
  //     author: 'J. R. R. Tolkien',
  //     date: new Date('1937-09-21'),
  //   };
  //   hamlet = {
  //     title: 'Hamlet',
  //     author: 'William Shakespeare',
  //     date: new Date('1600'),
  //   };
  //   OurBookshelf.addBook(theLordOfTheRings);
  //   OurBookshelf.addBook(theHobbit);
  //   OurBookshelf.addBook(hamlet);
  async create(book: Book): Promise<void> {
    this.OurBookshelf.addBook(book);
  }

  async findAll(): Promise<Book[]> {
    return this.OurBookshelf.getAllBooks();
  }
  async findAllByAuthor(authorName: string): Promise<Book[]> {
    return this.OurBookshelf.getBooksOf(authorName);
  }

  async getBookByName(bookName: string): Promise<Book> {
    return this.OurBookshelf.getBook(bookName);
  }
  async deleteBook(bookName: string): Promise<void> {
    return this.OurBookshelf.deleteBook(bookName);
  }
}
