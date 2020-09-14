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
  create(book: Book): void {
    this.OurBookshelf.addBook(book);
  }

  findAll(): Book[] {
    return this.OurBookshelf.getAllBooks();
  }
  findAllByAuthor(authorName: string): Book[] {
    return this.OurBookshelf.getBooksOf(authorName);
  }

  getBookByName(bookName: string): Book {
    return this.OurBookshelf.getBook(bookName);
  }
  deleteBook(bookName: string): void {
    return this.OurBookshelf.deleteBook(bookName);
  }
}
