import { Book } from './Book';

export class Bookshelf {
  ListOfBooks: Array<Book>;
  constructor() {
    this.ListOfBooks = [];
  }
  addBook(book: Book) {
    const isBookAlreadyOnShelfs = this.ListOfBooks.some(
      (thisBook: Book): boolean => {
        return thisBook === book;
      },
    );
    if (!isBookAlreadyOnShelfs) {
      this.ListOfBooks.push(book);
    }
  }
  getBook(name: string): Book {
    const BooksWithName: Array<Book> = this.ListOfBooks.filter(
      (value: Book) => {
        return value.title === name;
      },
    );
    return BooksWithName[0];
  }
  deleteBook(name: string): void {
    this.ListOfBooks = this.ListOfBooks.filter(obj => obj.title !== name);
  }
  getBooksOf(author: string): Array<Book> {
    const BooksWithAuthor: Array<Book> = this.ListOfBooks.filter(
      (value: Book) => {
        return value.author === author;
      },
    );
    return BooksWithAuthor;
  }
  getAllBooks(): Array<Book> {
    return this.ListOfBooks.sort((a: Book, b: Book): number => {
      return a.title > b.title ? 1 : -1;
    });
  }
  getTotalNumberOfBooks(): number {
    return this.ListOfBooks.length;
  }
  getBooksPublishedBefore(aDate: string | Date): Array<Book> {
    return this.ListOfBooks.filter((thisBook: Book) => {
      return thisBook.date <= aDate;
    }).sort((a: Book, b: Book): number => {
      return a.title > b.title ? 1 : -1;
    });
  }
}
